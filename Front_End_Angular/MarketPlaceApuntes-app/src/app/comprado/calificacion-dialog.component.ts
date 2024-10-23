import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-calificacion-dialog',
  template: `
    <h1 mat-dialog-title>Calificar Apunte</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Calificación</mat-label>
        <input matInput [(ngModel)]="calificacion" type="number" min="1" max="10" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onConfirm()">Confirmar</button>
    </div>
  `,
  standalone: true, // Definir que este es un componente independiente
  imports: [MatFormFieldModule, MatInputModule, FormsModule] // Importar los módulos necesarios
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
