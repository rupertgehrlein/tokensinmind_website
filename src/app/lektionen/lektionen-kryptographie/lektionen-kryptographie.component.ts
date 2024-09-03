import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lektionen-kryptographie',
  templateUrl: './lektionen-kryptographie.component.html',
  styleUrls: ['./lektionen-kryptographie.component.scss'],
  imports: [DragDropModule],
  standalone: true,
})
export class LektionenKryptographieComponent {
  startTime: number;
  initialTime: number;
  elapsedTime: number;
  userId;
  timer: any;
  isVisible: boolean = true;

  correctAnswers = ['Verschlüsselung', 'Caesar-Chiffre', 'RSA'];
  dropZones = ['', '', ''];
  wordBank = ['Caesar-Chiffre', 'RSA', 'Verschlüsselung'];

  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    this.initialTime = await this.supabaseService.getTime('lektion', 'kryptographie', this.userId) || 0;
    this.startTime = Date.now() - this.initialTime;
    this.startTimer();

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.handleDrag();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.isVisible) {
        this.updateTimeAndSaveToDatabase();
      }
    }, 1000);
  }

  updateTimeAndSaveToDatabase() {
    this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.supabaseService.setTime('lektion', 'kryptographie', this.initialTime + this.elapsedTime, this.userId);
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

  /* drop(event: CdkDragDrop<string[]>, index: number | null) {
    // Überprüfe, ob das Element von der Word-Bank in eine Drop-Zone verschoben wurde
    if (event.previousContainer !== event.container && index !== null) {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      // Überprüfe, ob das abgelegte Wort korrekt ist
      if (this.dropZones[index] === this.correctAnswers[index]) {
        console.log('Richtige Antwort!');
      } else {
        console.log('Falsche Antwort. Versuche es erneut.');
      }
    }
  } */

    draggedElement: HTMLElement | null = null;

    handleDrag() {
      const dragItems = document.querySelectorAll(".dragItem");
      const dropZones = document.querySelectorAll(".dropzone");

      dragItems.forEach(item => {
        // Maus-Events
        item.addEventListener("dragstart", (event) => {
          this.draggedElement = event.target as HTMLElement;
          this.draggedElement.classList.add("dragging");
        });

        item.addEventListener("dragend", (event) => {
          (event.target as HTMLElement).classList.remove("dragging");
        });

        // Touch-Events
        item.addEventListener("touchstart", (event: TouchEvent) => {
          this.draggedElement = event.target as HTMLElement;
          this.draggedElement.classList.add("dragging");

          const touch = event.touches[0];
          const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;

          if (target && target.classList.contains("dropzone")) {
            target.classList.add("dragover");
          }
        });

        item.addEventListener("touchmove", (event: TouchEvent) => {
          const touch = event.touches[0];
          const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;

          // Handle dragging effect on dropzones
          dropZones.forEach(zone => {
            zone.classList.remove("dragover");
          });

          if (target && target.classList.contains("dropzone")) {
            target.classList.add("dragover");
          }
        });

        item.addEventListener("touchend", (event: TouchEvent) => {
          this.draggedElement?.classList.remove("dragging");

          const touch = event.changedTouches[0];
          const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;

          if (target && target.classList.contains("dropzone")) {
            target.classList.remove("dragover");
            if (this.draggedElement) {
              target.appendChild(this.draggedElement);
              this.draggedElement = null;
            }
          }
        });
      });

      dropZones.forEach(zone => {
        zone.addEventListener("dragover", (event) => {
          event.preventDefault();
        });

        zone.addEventListener("dragenter", (event) => {
          const target = event.target as HTMLElement;
          if (target.classList.contains("dropzone")) {
            target.classList.add("dragover");
          }
        });

        zone.addEventListener("dragleave", (event) => {
          const target = event.target as HTMLElement;
          if (target.classList.contains("dropzone")) {
            target.classList.remove("dragover");
          }
        });

        zone.addEventListener("drop", (event) => {
          event.preventDefault();

          const target = event.target as HTMLElement;
          if (target.classList.contains("dropzone")) {
            target.classList.remove("dragover");
            if (this.draggedElement) {
              target.appendChild(this.draggedElement);
              this.draggedElement = null;
            }
          }
        });
      });
    }


  checkResults() {
    const dropZone1 = document.getElementById('dropzone1');
    const dropZone2 = document.getElementById('dropzone2');
    const dropZone3 = document.getElementById('dropzone3');
    const dropZone4 = document.getElementById('dropzone4');
    const dropZone5 = document.getElementById('dropzone5');
    const dropZone6 = document.getElementById('dropzone6');

    const correctAnswers = ['Verschlüsselung', 'Caesar-Chiffre', 'RSA', 'Hashwert', 'Hashing', 'Secure Hash Algorithm'];

    const dropZones = [dropZone1, dropZone2, dropZone3, dropZone4, dropZone5, dropZone6];
    dropZones.forEach((zone, index) => {
      if (zone?.children.length > 0) {
        const draggedItem = zone.children[0] as HTMLElement;
        if (draggedItem.innerText.trim() === correctAnswers[index]) {
          draggedItem.classList.add('correct');
          draggedItem.classList.remove('incorrect');
        } else {
          draggedItem.classList.add('incorrect');
          draggedItem.classList.remove('correct');
        }
      } else {
        // Wenn keine Elemente in der Dropzone sind, entfernen Sie die Farben
        const emptyItem = zone?.querySelector('.dragItem');
        emptyItem?.classList.remove('correct', 'incorrect');
      }
    });
  }

}
