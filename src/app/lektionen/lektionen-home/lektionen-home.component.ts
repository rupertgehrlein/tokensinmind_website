import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-lektionen-home',
  templateUrl: './lektionen-home.component.html',
  styleUrl: './lektionen-home.component.scss'
})
export class LektionenHomeComponent {
  userId;
  alreadyVisited;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(){
    this.userId = await this.supabaseService.getUserId();
    this.alreadyVisited = await this.supabaseService.getVisited(this.userId);
  }

}
