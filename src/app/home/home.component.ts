import { Component } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  supabase: SupabaseClient;
  username;
  loggedIn;

  constructor(private supabaseService: SupabaseService, private navbar: NavbarComponent) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.username = await this.supabaseService.getUsername();
    console.log(this.navbar.isLoggedIn);
    this.loggedIn = this.navbar.isLoggedIn;
  }


}
