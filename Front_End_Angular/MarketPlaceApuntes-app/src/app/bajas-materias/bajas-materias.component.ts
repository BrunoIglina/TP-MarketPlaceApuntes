import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BajasMateriasService } from './bajas-materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bajas-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bajas-materias.component.html',
  styleUrl: './bajas-materias.component.css'
})
export class BajasMateriasComponent implements OnInit{
  bajasMaterias: any[] = [];
  loading: boolean = false;

  constructor(private bajasMateriasService: BajasMateriasService) {}

  ngOnInit(): void {
    this.fetchBajasMaterias();
  }

  fetchBajasMaterias(): void {
    this.loading = true;
    this.bajasMateriasService.getMateriasBajas().subscribe({
      next: (data) => {
        this.bajasMaterias = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching bajas materias:', error);
        this.loading = false;
      }
    });
  }
  restoreMateria(id: number): void {
      Swal.fire({
        title: '¿Está seguro?',
        text: "Confirme si desea restaurar esta materia.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, restaurar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.bajasMateriasService.restoreMateria(id).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Restaurado!',
                text: 'La materia ha sido restaurada con éxito.',
                icon: 'success',
                confirmButtonColor: '#28a745'
              });
              this.fetchBajasMaterias(); 
            },
            error: (error) => {
              console.error('Error restoring materia:', error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un error al intentar restaurar la materia.',
                icon: 'error',
                confirmButtonColor: '#dc3545'
              });
            }
          });
        }
      });
    }
}
