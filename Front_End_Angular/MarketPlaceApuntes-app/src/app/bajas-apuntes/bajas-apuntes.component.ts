import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BajasApuntesService } from './bajas-apuntes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bajas-apuntes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bajas-apuntes.component.html',
  styleUrls: ['./bajas-apuntes.component.css']
})
export class BajasApuntesComponent implements OnInit {
  bajasApuntes: any[] = [];
  loading: boolean = false;

  constructor(private bajasApuntesService: BajasApuntesService) {}

  ngOnInit(): void {
    this.fetchBajasApuntes();
  }

  fetchBajasApuntes(): void {
    this.loading = true;
    this.bajasApuntesService.getApuntesBajas().subscribe({
      next: (data) => {
        this.bajasApuntes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching bajas apuntes:', error);
        this.loading = false;
      }
    });
  }

  restoreApunte(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Confirme si desea restaurar este apunte.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bajasApuntesService.restoreApunte(id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Restaurado!',
              text: 'El apunte ha sido restaurado con éxito.',
              icon: 'success',
              confirmButtonColor: '#28a745'
            });
            this.fetchBajasApuntes(); 
          },
          error: (error) => {
            console.error('Error restoring apunte:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al intentar restaurar el apunte.',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }
}
