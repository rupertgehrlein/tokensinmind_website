import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';
import * as sha256 from 'crypto-js/sha256';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule, Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-uebungen-kryptowaehrungen',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './uebungen-kryptowaehrungen.component.html',
  styleUrl: './uebungen-kryptowaehrungen.component.scss'
})
export class UebungenKryptowaehrungenComponent {
  //Zeitmesser und Besuchstracker
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;
  isVisible: boolean = true;

  constructor(private supabaseService: SupabaseService) {
    this.addGenerals();
    //this.calculateEnergy();
  }

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('uebung', 'waehrung', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime;
    this.startTimer();
    this.currentBestTime = await this.supabaseService.getBestTime(this.userId);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  startTimer() {
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

  text_presets = [
    "<li>Block 1: Alice hat 25 Tokens</li> <li>Block 2: Alice gibt Bob 15 Tokens</li> <li>Block 3: Bob kauft sich Schuhe für 10 Tokens</li> <li>Block 4: Bob gibt Alice 5 Tokens zurück</li>",
    "<li>Block 1: Sam braucht 150 Tokens</li> <li>Block 2: Max schenkt Sam 100 Tokens zum Geburtstag</li> <li>Block 3: Sam verkauft alte Bücher für 50 Tokens</li> <li>Block 4: Sam kauft für die Tokens ein Muttertagsgeschenk</li>",
    "<li>Block 1: Maja kauft sich einen Pulli für 20 Coins</li> <li>Block 2: Der Pulli ist ihr aber leider zu groß</li> <li>Block 3: Maja schickt den Pulli zurück</li> <li>Block 4: Sie bekommt die 20 Coins zum Glück zurück</li>"
  ];
  text_presets_id = Math.floor(Math.random() * this.text_presets.length);
  
  answers_presets = [
    ["Alice hat 25 Tokens", "Alice gibt Bob 15 Tokens", "Bob kauft sich Schuhe für 10 Tokens ", "Bob gibt Alice 5 Tokens zurück"],
    ["Sam braucht 150 Tokens", "Max schenkt Sam 100 Tokens zum Geburtstag", "Sam verkauft alte Bücher für 50 Tokens", "Sam kauft für die Tokens ein Muttertagsgeschenk"],
    ["Maja kauft sich einen Pulli für 20 Coins", "Der Pulli ist ihr aber leider zu groß", "Maja schickt den Pulli zurück", "Sie bekommt die 20 Coins zum Glück zurück"]
  ];

  // Block 1
  onInputBlockOne(event) {
    console.log(this.answers_presets[0][0]);

    this.blockchainBlocks[0].data = event;
    this.updateHashBlockOne();
    this.blockchainBlocks[1].prevHash = this.blockchainBlocks[0].hash;
    this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
    this.blockchainBlocks[3].prevHash = this.blockchainBlocks[2].hash;
    var textfieldOne = (<HTMLInputElement>document.getElementById('inputOne'));
    var inputOne = textfieldOne.value;
    if (inputOne === this.answers_presets[this.text_presets_id][0]) {
      this.disableButtonOne = false;
      textfieldOne.disabled = true;
      this.updateHashBlockOne();
      this.changeColor();
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
    var textfieldTwo = (<HTMLInputElement>document.getElementById('inputTwo'))
    var inputTwo = textfieldTwo.value;
    if (inputTwo === this.answers_presets[this.text_presets_id][1] && this.hashCorrectBlockOne === true)  {
      this.disableButtonTwo = false;
      textfieldTwo.disabled = true;
      this.blockchainBlocks[2].prevHash = this.blockchainBlocks[1].hash;
      this.changeColor();
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
    var textfieldThree = (<HTMLInputElement>document.getElementById('inputThree'));
    var inputThree = textfieldThree.value;
    if (inputThree === this.answers_presets[this.text_presets_id][2] && this.hashCorrectBlockTwo === true) {
      this.disableButtonThree = false;
      textfieldThree.disabled = true;
      this.blockchainBlocks[3].prevHash = this.blockchainBlocks[2].hash;
      this.changeColor();
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
    var textfieldFour = (<HTMLInputElement>document.getElementById('inputFour'));
    var inputFour = textfieldFour.value;
    if (inputFour === this.answers_presets[this.text_presets_id][3] && this.hashCorrectBlockThree === true) {
      this.disableButtonFour = false;
      textfieldFour.disabled = true;
      this.changeColor();
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

  pace = 700;

  setEasy() {
    this.pace = 700;
    document.getElementById('PoW_text').innerHTML = this.text_presets[this.text_presets_id];

  }

  setHard() {
    this.pace = 550;
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
  blockCount = 1;
  changeColor() {
    document.getElementById("Block" + this.blockCount).style.backgroundImage = "linear-gradient(-150deg, #8f8d27, #2b2809)";
    this.blockCount += 1;
  }

  victory() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  //Mining-Competition
  balance: number = 0;
  miningReward: number = 1;
  mathProblem: string = '';
  userAnswer: string = '';
  correctAnswer: number;
  totalProblems: number = 10;
  problemsSolved: number = 0;
  gameStartTime: number;
  gameEndTime: number;
  gameInProgress: boolean = false;
  gameCompleted: boolean = false;
  gameTime: number = 0;
  answerFeedback: string = '';
  currentBestTime;

  generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = num1 + num2;
    this.mathProblem = `${num1} + ${num2}`;
  }

  startGame() {
    this.gameStartTime = Date.now();
    this.gameInProgress = true;
    this.problemsSolved = 0;
    this.gameCompleted = false;
    this.answerFeedback = '';
    this.userAnswer = '';
    this.generateMathProblem();
  }

  checkAnswer() {
    if (parseInt(this.userAnswer) === this.correctAnswer) {
      this.problemsSolved++;
      this.answerFeedback = 'Richtig!';
      this.clearInputField();  // Leert das Eingabefeld
      if (this.problemsSolved < this.totalProblems) {
        this.generateMathProblem();
      } else {
        this.endGame();
      }
    } else {
      this.answerFeedback = 'Falsche Antwort, versuche es erneut!';
    }
  }

  clearInputField() {
    setTimeout(() => {
      this.userAnswer = '';
    }, 50);
  }

  endGame() {
    this.gameEndTime = Date.now();
    this.gameInProgress = false;
    this.gameCompleted = true;
    this.gameTime = (this.gameEndTime - this.gameStartTime) / 1000;
    if (this.gameTime < this.currentBestTime) {
      this.supabaseService.setBestTime(this.userId, this.gameTime);
    }
    this.supabaseService.setCurrentCoins(1);
  }

  restartGame() {
    this.startGame();
  }

  //Generäle
  generals: { id: number, name: string, honest: boolean, message: string }[] = [];
  messages: string[] = ['Angreifen', 'Zurückziehen'];
  simulationStep: number = 0;
  consensusResult: string = '';

  addGenerals() {
    const names = ['General A', 'General B', 'General C', 'General D'];
    names.forEach((name, index) => {
      this.generals.push({ id: index + 1, name: name, honest: true, message: '' });
    });
  }

  startSimulation() {
    this.simulationStep = 1;
    this.generals[0].message = this.messages[Math.floor(Math.random() * this.messages.length)];
    this.passMessage(1);
  }

  passMessage(index: number) {
    if (index >= this.generals.length) {
      this.simulationStep = 2;
      return;
    }

    const previousGeneral = this.generals[index - 1];
    const currentGeneral = this.generals[index];

    if (currentGeneral.honest) {
      currentGeneral.message = previousGeneral.message;
    } else {
      currentGeneral.message = previousGeneral.message === 'Angreifen' ? 'Zurückziehen' : 'Angreifen';
    }

    this.passMessage(index + 1);
  }

  checkConsensus() {
    const honestMessages = this.generals.filter(g => g.honest).map(g => g.message);
    const attackCount = honestMessages.filter(msg => msg === 'Angreifen').length;
    const retreatCount = honestMessages.filter(msg => msg === 'Zurückziehen').length;

    if (attackCount >= 3) {
      this.consensusResult = 'Die Generäle haben sich auf einen Angriff geeinigt. Der Angriff war erfolgreich!';
    } else if (retreatCount >= 3) {
      this.consensusResult = 'Die Generäle haben sich auf einen Rückzug geeinigt. Der Angriff wurde abgebrochen.';
    } else {
      this.consensusResult = 'Die Generäle konnten sich nicht auf eine einheitliche Strategie einigen. Der Angriff scheiterte mit großen Verlusten.';
    }

    this.simulationStep = 3;
  }

  toggleHonesty(general) {
    general.honest = !general.honest;
  }

  restartSimulation() {
    this.simulationStep = 0;
    this.consensusResult = '';
    this.generals.forEach(g => g.message = '');
  }

  //Kryptowährungen Energie
  blocksToMine: number = 5;
  networkSize: number = 1000;
  kWhCost: number = 0.30; // Beispielwert in EUR
  powEnergyPerBlockPerNode: number = 100; // Durchschnittlicher Verbrauch in kWh
  posEnergyPerBlockPerNode: number = 100; // Beispielwert in kWh

  energyPoW: number;
  energyPoS: number;
  costPoW: number;
  costPoS: number;

  chartData: any[];
  view: any[] = [700, 400];
  chartOptions: any = {
    showXAxis: true,
    showYAxis: true,
    xAxisLabel: 'Konsensmethoden',
    yAxisLabel: 'Werte',
  };

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  calculateEnergy() {
    this.energyPoW = this.blocksToMine * this.networkSize * this.powEnergyPerBlockPerNode / 1000; // in MWh
    this.energyPoS = this.blocksToMine * this.posEnergyPerBlockPerNode / 1000; // in MWh
    this.costPoW = this.energyPoW * this.kWhCost;
    this.costPoS = this.energyPoS * this.kWhCost;

    console.log('POW:', this.energyPoW, this.costPoW)
    console.log('POS:', this.energyPoS, this.costPoS)

    this.updateChartData();
  }

  updateChartData() {
    this.chartData = [
      {
        "name": "Proof-of-Work",
        "series": [
          { "name": "Energieverbrauch (MWh)", "value": this.energyPoW },
          { "name": "Kosten (EUR)", "value": this.costPoW }
        ]
      },
      {
        "name": "Proof-of-Stake",
        "series": [
          { "name": "Energieverbrauch (MWh)", "value": this.energyPoS },
          { "name": "Kosten (EUR)", "value": this.costPoS }
        ]
      }
    ];
  }

  onBlocksToMineChange() {
    this.calculateEnergy();
  }

  onNetworkSizeChange(event: any) {
    const value = event.target.value;
    this.networkSize = value;
    this.calculateEnergy();
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
