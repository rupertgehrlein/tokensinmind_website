import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uebungen-kryptowaehrungen',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private supabaseService: SupabaseService) {}

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

}
