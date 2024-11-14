import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-calificacion-dialog',
  template: `
    <h1 mat-dialog-title class="dialog-title">Calificar Apunte</h1>
    <div mat-dialog-content class="dialog-content">
      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Calificación</mat-label>
        <input matInput [(ngModel)]="calificacion" type="number" min="1" max="10" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-button color="warn" (click)="onCancel()">Cancelar</button>
      <button mat-button color="primary" (click)="onConfirm()">Confirmar</button>
    </div>
  `,
  styles: [`
    .dialog-title {
      font-size: 24px;
      font-weight: bold;
      color: #3f51b5;
    }

    .dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .form-field {
      width: 100%;
    }

    .dialog-actions {
      justify-content: flex-end;
      margin-top: 20px;
    }

    button {
      font-weight: bold;
    }
  `],
  standalone: true, 
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule] 
})
export class CalificacionDialogComponent {
  calificacion: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CalificacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { apunteId: number }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.calificacion);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
