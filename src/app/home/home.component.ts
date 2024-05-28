// home.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  supabase: SupabaseClient;
  username;
  isLoggedIn: boolean;
  private loggedInSubscription: Subscription;

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.username = await this.supabaseService.getUsername();

    this.loggedInSubscription = this.supabaseService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
