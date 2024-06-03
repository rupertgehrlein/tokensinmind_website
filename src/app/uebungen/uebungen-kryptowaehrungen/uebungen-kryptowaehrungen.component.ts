import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';
import * as sha256 from 'crypto-js/sha256';


@Component({
  selector: 'app-uebungen-kryptowaehrungen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uebungen-kryptowaehrungen.component.html',
  styleUrl: './uebungen-kryptowaehrungen.component.scss'
})
export class UebungenKryptowaehrungenComponent {
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;
  isVisible: boolean = true;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('uebung', 'waehrung', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime;
    this.startTimer();

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  startTimer(){
    this.timer = setInterval(() => {
      if (this.isVisible) {
        this.updateTimeAndSaveToDatabase();
      }
    }, 1000);
  }

  updateTimeAndSaveToDatabase() {
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.supabaseService.setTime('uebung', 'waehrung', this.initialTime + this.elapsedTime, this.userId);
  }

  handleVisibilityChange = () => {
    this.isVisible = !document.hidden;
    if (!this.isVisible) {
      clearInterval(this.timer);
    } else {
      this.startTime = Date.now() - this.elapsedTime * 1000;
      this.startTimer();
    }
  }

  setVisited(format, type, topic) {
    this.supabaseService.setVisited(format, type, topic, this.userId);
  }

  hashCorrectBlockOne = false;
  hashCorrectBlockTwo = false;
  hashCorrectBlockThree = false;
  hashCorrectBlockFour = false;
  disableButtonOne = true;
  disableButtonTwo = true;
  disableButtonThree = true;
  disableButtonFour = true;
  

  blockchainBlocks = [
    {
      index: 1,
      nonce: 0,
      data: '',
      hash: '',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000'
    },
    {
      index: 2,
      nonce: 0,
      data: '',
      hash: '',
      prevHash: ''
    },
    {
      index: 3,
      nonce: 0,
      data: '',
      hash: '',
      prevHash: ''
    },
    {
      index: 4,
      nonce: 0,
      data: '',
      hash: '',
      prevHash: ''
    },
  ]


  ngOnChanges() {
    /* this.computeNonceBlockOne();
    this.computeNonceBlockTwo();
    this.computeNonceBlockThree();
    this.computeNonceBlockFour(); */
    this.updateHashBlockOne();
    this.updateHashBlockTwo();
    this.updateHashBlockThree();
    this.updateHashBlockFour();
  }

  // Block 1
  onInputBlockOne(event) {
    this.blockchainBlocks[0].data = event;
    this.updateHashBlockOne();
    this.blockchainBlocks[1].prevHash = this.blockchainBlocks[0].hash;
    this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
    this.blockchainBlocks[3].prevHash = this.blockchainBlocks[2].hash;
    var inputOne = (<HTMLInputElement>document.getElementById('inputOne')).value;
    if (inputOne === 'Alice hat 25 Tokens') {
      this.disableButtonOne = false;
    }
    else {
        this.hashCorrectBlockOne = false;
        this.disableButtonTwo = true;
    }
  }

  updateHashBlockOne() {
    const combinedData = `${this.blockchainBlocks[0].nonce}${this.blockchainBlocks[0].data}${this.blockchainBlocks[0].hash}${this.blockchainBlocks[0].prevHash}`;
    this.blockchainBlocks[0].hash = sha256(combinedData).toString();
  }

  
  computeNonceBlockOne() {
    while (this.blockchainBlocks[0].hash.substring(0, 4) !== '0000') {
      this.blockchainBlocks[0].nonce++;
      this.updateHashBlockOne();
      this.hashCorrectBlockOne = true;
      this.blockchainBlocks[1].prevHash = this.blockchainBlocks[0].hash;
      this.data = this.newData;
      this.newNonce = this.nonce;
      this.newHash = this.hash;
      this.nonce = 0;
      this.hash = '';
      this.changeBackground();
    }
    
  }

  // Block 2
  onInputBlockTwo(event) {
    this.blockchainBlocks[1].data = event;
    this.updateHashBlockTwo();
    this.updateHashBlockThree();
    var inputThree = (<HTMLInputElement>document.getElementById('inputTwo')).value;
    if (inputThree === 'Alice gibt Bob 15 Tokens') {
      this.disableButtonTwo = false;
      this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
    }
    else {
      this.disableButtonTwo = true;
      this.hashCorrectBlockTwo = false;
    }
  }

  updateHashBlockTwo() {
    const combinedData = `${this.blockchainBlocks[1].nonce}${this.blockchainBlocks[1].data}${this.blockchainBlocks[1].hash}${this.blockchainBlocks[1].prevHash}`;
    this.blockchainBlocks[1].hash = sha256(combinedData).toString();
  }

  computeNonceBlockTwo() {
    while (this.blockchainBlocks[1].hash.substring(0, 4) !== '0000') {
      this.blockchainBlocks[1].nonce++;
      this.updateHashBlockTwo();
    };
    this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
    this.hashCorrectBlockTwo = true;
  }

  // Block 3
  onInputBlockThree(event) {
    this.blockchainBlocks[2].data = event;
    this.updateHashBlockThree();
    this.hashCorrectBlockThree = false;
    var inputThree = (<HTMLInputElement>document.getElementById('inputThree')).value;
    if (inputThree === 'Bob kauft sich Schuhe für 10 Tokens') {
      this.disableButtonThree = false;
      this.blockchainBlocks[3].prevHash = this.blockchainBlocks[2].hash;
    }
    else {
      this.disableButtonFour = true;
      this.hashCorrectBlockThree = false;
    }
  }

  updateHashBlockThree() {
    const combinedData = `${this.blockchainBlocks[2].nonce}${this.blockchainBlocks[2].data}${this.blockchainBlocks[2].hash}${this.blockchainBlocks[2].prevHash}`;
    this.blockchainBlocks[2].hash = sha256(combinedData).toString();
  }

  computeNonceBlockThree() {
    while (this.blockchainBlocks[2].hash.substring(0, 4) !== '0000') {
      this.blockchainBlocks[2].nonce++;
      this.updateHashBlockThree();
      this.hashCorrectBlockThree = true;
    };
  }

  // Block 4
  onInputBlockFour(event) {
    this.blockchainBlocks[3].data = event;
    this.updateHashBlockFour();
    this.hashCorrectBlockFour = false;
    var inputFour = (<HTMLInputElement>document.getElementById('inputFour')).value;
    if (inputFour === 'Bob gibt Alice 5 Tokens zurück') {
      this.disableButtonFour = false;
    }
    else {
      this.disableButtonFour = true;
      this.hashCorrectBlockFour = false;
    }
  }

  updateHashBlockFour() {
    const combinedData = `${this.blockchainBlocks[3].nonce}${this.blockchainBlocks[3].data}${this.blockchainBlocks[3].hash}${this.blockchainBlocks[3].prevHash}`;
    this.blockchainBlocks[3].hash = sha256(combinedData).toString();
  }

  computeNonceBlockFour() {
    while (this.blockchainBlocks[3].hash.substring(0, 4) !== '0000') {
      this.blockchainBlocks[3].nonce++;
      this.updateHashBlockFour();
    };
    this.hashCorrectBlockFour = true;
  }

  nonceComplexity = 4;
  leadingZerosHash = '0000';
  hashCorrect = true;
  nonce = 0;
  data = '';
  hash = '';
  prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
  newNonce;
  newHash;
  newData;
  start;
  elapsedOne;
  elapsedTwo;
  elapsedThree;
  elapsedFour;


  onInput(event: any) {
    this.newData = event;
    this.changeBackground();
  }

  changeBackground() {
    if(this.data != this.newData){this.hashCorrect = false}else {this.hashCorrect = true}
  }

  

  computeBlockOne() {
    this.start = new Date().getTime();
    this.computeNonceBlockOne();
    this.elapsedOne = new Date().getTime() - this.start;
    this.percentage = "25%";
  }
  computeBlockTwo() {
    this.start = new Date().getTime();
    this.computeNonceBlockTwo();
    this.elapsedTwo = new Date().getTime() - this.start;
    this.percentage = "50%";
  }
  computeBlockThree() {
    this.start = new Date().getTime();
    this.computeNonceBlockThree();
    this.elapsedThree = new Date().getTime() - this.start;
    this.percentage = "75%";
  }
  computeBlockFour() {
    this.start = new Date().getTime();
    this.computeNonceBlockFour();
    this.elapsedFour = new Date().getTime() - this.start;
    this.percentage = "100%";
  }

  percentage: string = "0%";

  private updateSliderToggle: boolean = false;

  updateSlider(event) {
    let percentage: number = Math.floor(
      (event.layerX / (event.target.offsetWidth - 3)) * 100
    );
  }

  pace = 400;

  setEasy() {
    this.pace = 300
  }

  setHard() {
    this.pace = 150
  }

  i = 0;
opponentSlider() {
  if (this.i == 0) {
    this.i = 1;
    var elem = document.getElementById("opponentBar");
    var width = 0;
    var id = setInterval(frame, this.pace);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        this.i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}
  	/*
    const previous = parseInt(this.percentage);
    if (previous > percentage) {
      percentage = previous - 25;
    } else {
      percentage = previous + 25;
    }
    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 0) {
      percentage = 0;
    }

    console.log(previous);

    this.percentage = percentage + "%";
  */

  
}