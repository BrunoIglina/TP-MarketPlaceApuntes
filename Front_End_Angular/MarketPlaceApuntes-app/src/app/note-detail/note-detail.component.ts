import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  standalone: true
})
export class NoteDetailComponent {
  @Input() note: any;
  @Output() back = new EventEmitter<void>();

  goBack() {
    this.back.emit();
  }

  buyNote() {
    //  FALTA Implementar funcionalidad para comprar el apunte
  }
}
 