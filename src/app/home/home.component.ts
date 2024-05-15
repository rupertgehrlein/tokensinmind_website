import { Component } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  supabase: SupabaseClient;
  username;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async ngOnInit() {
    this.username = await this.supabaseService.getUsername();
  }


}
