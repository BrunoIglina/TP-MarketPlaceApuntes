import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompradoService } from './comprado.service'; 
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterModule } from '@angular/router'; 
import { CalificacionDialogComponent } from './calificacion-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-comprado',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, MatDialogModule], 
  templateUrl: './comprado.component.html',
  styleUrls: ['./comprado.component.css']
})
export class CompradoComponent implements OnInit {
  apuntes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3; 
  numeroAlumno: number = 1; 

  constructor(private compradoService: CompradoService, private router: Router,  private dialog: MatDialog) {} 

  ngOnInit() {
    this.loadComprados();
  }

  loadComprados() {
    this.compradoService.getComprados(this.numeroAlumno).subscribe((data: any) => {
      this.apuntes = data;
    });
  }

  get paginatedApuntes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.apuntes.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.apuntes.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  verDetalles(apunteId: number) {
    this.router.navigate(['/apunte-comprado', apunteId]); 
  }

  calificar(apunteId: number) {
    const dialogRef = this.dialog.open(CalificacionDialogComponent, {
      width: '250px',
      data: { apunteId }
    });
  
    dialogRef.afterClosed().subscribe((calificacion: number | null) => {
      if (calificacion !== null) {
        
        // Llamada al servicio para enviar la calificación al backend
        this.compradoService.calificarApunte(this.numeroAlumno, apunteId, calificacion)
          .subscribe(response => {
            alert('¡Calificación guardada!');
            this.loadComprados(); // Refrescar la lista de apuntes comprados
          }, error => {
            console.error('Error al guardar la calificación:', error);
            alert('No se pudo guardar la calificación');
          });
      }
    });
  }
}  