import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-lektionen-kryptographie',
  templateUrl: './lektionen-kryptographie.component.html',
  styleUrl: './lektionen-kryptographie.component.scss'
})
export class LektionenKryptographieComponent {
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('lektion', 'kryptographie', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime; // Startzeit des Timers inkl. bereits verstrichener Zeit

    // Starte den Timer, um die Zeit zu aktualisieren und in die Datenbank zu schreiben
    this.timer = setInterval(() => {
      this.updateTimeAndSaveToDatabase();
    }, 1000); // Timer wird jede Sekunde aktualisiert
  }

  ngOnDestroy() {
    // Stoppe den Timer, wenn die Komponente zerstört wird
    clearInterval(this.timer);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event) {
    clearInterval(this.timer);
  }

  updateTimeAndSaveToDatabase() {
    // Aktualisiere die verstrichene Zeit in Sekunden
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.supabaseService.setTime('lektion', 'kryptographie', this.initialTime + this.elapsedTime, this.userId);
  }
}

