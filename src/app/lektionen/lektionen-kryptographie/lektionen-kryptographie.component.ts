import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-lektionen-kryptographie',
  templateUrl: './lektionen-kryptographie.component.html',
  styleUrls: ['./lektionen-kryptographie.component.scss']
})
export class LektionenKryptographieComponent {
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;
  isVisible: boolean = true;
  visibilityChangeListenerAdded: boolean = false;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('lektion', 'kryptographie', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime;

    // Only add the visibility change listener once
    if (!this.visibilityChangeListenerAdded) {
      this.visibilityChangeListenerAdded = true;
      document.addEventListener('visibilitychange', () => {
        this.isVisible = document.visibilityState === 'visible';
        if (!this.isVisible) {
          clearInterval(this.timer);
        }
      });
    }

    // Starte den Timer, um die Zeit zu aktualisieren und in die Datenbank zu schreiben
    this.timer = setInterval(() => {
      this.updateTimeAndSaveToDatabase();
    }, 1000);
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
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.supabaseService.setTime('lektion', 'kryptographie', this.initialTime + this.elapsedTime, this.userId);
  }
}
