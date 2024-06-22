// home.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  supabase: SupabaseClient;
  username;
  isLoggedIn: boolean;
  currentCoins;
  private coinsSubscription: Subscription;
  private loggedInSubscription: Subscription;
  quizStatus: any;

  constructor(private router: Router, private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.loggedInSubscription = this.supabaseService.loggedIn$.subscribe(async loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.currentCoins = await this.supabaseService.getCurrentCoins(); // Manually update coins
      } else {
        this.currentCoins = 0; // Reset coins if not logged in
      }
      this.cdr.detectChanges();
    });

    this.coinsSubscription = this.supabaseService.coins$.subscribe(coins => {
      this.currentCoins = coins;
      this.cdr.detectChanges();
    });

    this.quizStatus = await this.supabaseService.getQuizStatus();
    /* this.quizStatus = this.quizStatus[0].quiz_status; */
  }

  ngOnChanges() {
    this.coinsSubscription = this.supabaseService.coins$.subscribe(coins => {
      this.currentCoins = coins;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }

  canStartBeginnerQuiz(): boolean {
    return this.currentCoins >= 50;
  }

  canStartProQuiz(): boolean {
    return this.quizStatus.beginner && this.currentCoins >= 100;
  }

  canStartExpertQuiz(): boolean {
    return this.quizStatus.beginner && this.quizStatus.pro && this.currentCoins >= 150;
  }
}
