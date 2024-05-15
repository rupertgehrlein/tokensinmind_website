import { Component, HostListener } from '@angular/core';
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
  isPageVisible: boolean = true;

  constructor(private supabaseService: SupabaseService) {
    // Überprüfen, ob die Seite sichtbar ist
    document.addEventListener("visibilitychange", () => {
      this.isPageVisible = !document.hidden;
      if (this.isPageVisible) {
        this.startTime = Date.now() - this.elapsedTime * 1000; // Neustart des Timers mit der verstrichenen Zeit
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
  }

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('lektion', 'kryptographie', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime * 1000; // Startzeit des Timers inkl. bereits verstrichener Zeit
    this.startTimer();
  }

  ngOnDestroy() {
    // Stoppe den Timer, wenn die Komponente zerstört wird
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.updateTimeAndSaveToDatabase();
    }, 1000); // Timer wird jede Sekunde aktualisiert
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  updateTimeAndSaveToDatabase() {
    // Aktualisiere die verstrichene Zeit in Sekunden
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.supabaseService.setTime('lektion', 'kryptographie', this.initialTime + this.elapsedTime, this.userId);
  }
}
