import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';
import * as sha256 from 'crypto-js/sha256';


@Component({
  selector: 'app-uebungen-blockchain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uebungen-blockchain.component.html',
  styleUrl: './uebungen-blockchain.component.scss'
})

export class UebungenBlockchainComponent {
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;
  isVisible: boolean = true;
  /* static NonceTestComponetn = class {} */

  constructor(private supabaseService: SupabaseService) {}


  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('uebung', 'blockchain', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime;
    this.startTimer();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    //Übung 1
    this.computeHash();
    //Übung 2
    /* this.computeNonceBlockOne();
    this.computeNonceBlockTwo();
    this.computeNonceBlockThree(); */
    //Übung 3
    //this.computeHash();
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
    this.supabaseService.setTime('uebung', 'blockchain', this.initialTime + this.elapsedTime, this.userId);
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


  // Übung 1: Block einer Blockchain erstellen

  hashCorrect = true;
  nonce = 0;
  data = '';
  hash = '';
  prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
  newNonce;
  newHash;
  newData;


  onInput(event: any) {
    this.newData = event;
    this.changeBackground();
  }

  changeBackground() {
    if(this.data != this.newData){this.hashCorrect = false}else{this.hashCorrect = true}
  }

  updateHash() {
    const combinedData = `${this.nonce}${this.newData}${this.prevHash}${this.hash}`;
    this.hash = sha256(combinedData).toString();
  }

  computeHash() {
    while (this.hash.substring(0, 4) !== '0000') {
      this.nonce++;
      this.updateHash();
    }
    this.data = this.newData;
    this.newNonce = this.nonce;
    this.newHash = this.hash;
    this.nonce = 0;
    this.hash = '';
    this.changeBackground();
  }


  // Übung 2: Mehrere Blöcke

  blockChain(){
    this.computeNonceBlockOne();
    this.computeNonceBlockTwo();
    this.computeNonceBlockThree();
  }


  hashCorrectBlockOne = true;
  hashCorrectBlockTwo = true;
  hashCorrectBlockThree = true;

  disableButtonTwo = false;
  disableButtonThree = false;

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
  ]


  ngOnChanges() {
    /* this.computeNonceBlockOne();
    this.computeNonceBlockTwo();
    this.computeNonceBlockThree(); */
    this.updateHashBlockOne();
    this.updateHashBlockTwo();
    this.updateHashBlockThree();
  }

  onInputBlockOne(event) {
    this.blockchainBlocks[0].data = event;
    this.updateHashBlockOne();
    this.updateHashBlockTwo();
    this.updateHashBlockThree();
    this.hashCorrectBlockOne = false;
    this.hashCorrectBlockTwo = false;
    this.hashCorrectBlockThree = false;
    this.disableButtonTwo = true;
    this.disableButtonThree = true;
    this.blockchainBlocks[1].prevHash = this.blockchainBlocks[0].hash;
    this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
  }

  updateHashBlockOne() {
    const combinedData = `${this.blockchainBlocks[0].nonce}${this.blockchainBlocks[0].data}${this.blockchainBlocks[0].hash}${this.blockchainBlocks[0].prevHash}`;
    this.blockchainBlocks[0].hash = sha256(combinedData).toString();
  }

  computeNonceBlockOne() {
    while (this.blockchainBlocks[0].hash.substring(0, 4) !== '0000') {
      this.blockchainBlocks[0].nonce++;
      this.updateHashBlockOne();
    };
    this.blockchainBlocks[1].prevHash = this.blockchainBlocks[0].hash;
    this.hashCorrectBlockOne = true;
    this.disableButtonTwo = false;
  }

  onInputBlockTwo(event) {
    this.blockchainBlocks[1].data = event;
    this.updateHashBlockTwo();
    this.updateHashBlockThree();
    this.hashCorrectBlockTwo = false;
    this.hashCorrectBlockThree = false;
    this.disableButtonThree = true;
    this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
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
    this.disableButtonThree = false;
  }

  onInputBlockThree(event) {
    this.blockchainBlocks[2].data = event;
    this.updateHashBlockThree();
    this.hashCorrectBlockThree = false;
  }

  updateHashBlockThree() {
    const combinedData = `${this.blockchainBlocks[2].nonce}${this.blockchainBlocks[2].data}${this.blockchainBlocks[2].hash}${this.blockchainBlocks[2].prevHash}`;
    this.blockchainBlocks[2].hash = sha256(combinedData).toString();
  }

  computeNonceBlockThree() {
    while (this.blockchainBlocks[2].hash.substring(0, 4) !== '0000') {
      this.blockchainBlocks[2].nonce++;
      this.updateHashBlockThree();
    };
    this.hashCorrectBlockThree = true;
  }

  //Übung 3: NONCE Suche

  nonceComplexity = 4;
  leadingZerosHash = '0000';
  start;
  elapsed;
  isComputing = false;

  getSliderValue(event) {
    this.nonceComplexity = event.target.value;
    this.leadingZerosHash = '0'.repeat(this.nonceComplexity);
  }

  updateHashNONCE() {
    const combinedData = `${this.nonce}${this.newData}${this.prevHash}${this.hash}`;
    this.hash = sha256(combinedData).toString();
  }

  computeHashNONCE() {
    this.updateHashNONCE();
    while (this.hash.substring(0, this.nonceComplexity) !== this.leadingZerosHash) {
      this.nonce++;
      this.updateHashNONCE();
    }
    this.data = this.newData;
    this.newNonce = this.nonce;
    this.newHash = this.hash;
    this.nonce = 0;
    this.hash = '';
    this.changeBackground();
  }

  compute() {
    this.isComputing = true;
    this.start = new Date().getTime();
    setTimeout(() => {
      this.computeHashNONCE();
      this.elapsed = new Date().getTime() - this.start;
      this.isComputing = false;
    }, 10); // Simuliert die asynchrone Natur der Funktion
  }

}
