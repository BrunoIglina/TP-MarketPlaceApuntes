import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompradoService } from './comprado.service'; 
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterModule } from '@angular/router'; 
import { CalificacionDialogComponent } from './calificacion-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
  defaultImage: string = '../../assets/AM1.jpg';

  constructor(private compradoService: CompradoService, private router: Router, private dialog: MatDialog) {} 

  ngOnInit() {
    this.loadComprados();
  }
  
  loadComprados() {
    this.compradoService.getComprados(this.numeroAlumno).subscribe(
      (apuntes: any[]) => {
        const priceRequests = apuntes.map(apunte =>
          this.compradoService.getPrecioByApunteId(apunte.id_apunte).pipe(
            map(precio => ({
              ...apunte,
              precio: precio?.monto_precio || 'Sin precio'
            }))
          )
        );
  
        forkJoin(priceRequests).subscribe(
          apuntesConPrecio => {
            this.apuntes = apuntesConPrecio;
          },
          error => console.error('Error al cargar los precios', error)
        );
      },
      error => console.error('Error al cargar apuntes', error)
    );
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
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
        this.compradoService.calificarApunte(this.numeroAlumno, apunteId, calificacion)
          .subscribe(response => {
            Swal.fire({
              icon: 'success',
              title: '¡Calificación guardada!',
              text: 'La calificación se ha aplicado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.loadComprados(); // Recargar los apuntes después de calificar
            });
          }, error => {
            console.error('Error al guardar la calificación:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar la calificación',
              text: 'No se pudo guardar la calificación. Intente nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  }
}
