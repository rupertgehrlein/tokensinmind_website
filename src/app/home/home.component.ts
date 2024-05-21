// home.component.ts
import { Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { IsLoggedInService } from '../shared/is-logged-in.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  supabase: SupabaseClient;
  username;
  loggedIn = false;

  constructor(private supabaseService: SupabaseService, private authService: IsLoggedInService) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.username = await this.supabaseService.getUsername();
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    console.log(this.loggedIn);
  }
}
