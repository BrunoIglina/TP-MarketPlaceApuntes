import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModificarMateriaService } from './modificar-materia.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modificar-materia',
  standalone: true,
  templateUrl: './modificar-materia.component.html',
  styleUrls: ['./modificar-materia.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class ModificarMateriaComponent implements OnInit {
  materiaForm: FormGroup;
  codMateria: number | null = null;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modificarMateriaService: ModificarMateriaService
  ) {
    this.materiaForm = this.fb.group({
      nombre_materia: ['', Validators.required],
      nivel_carrera: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {
    this.codMateria = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Código de materia recibido:', this.codMateria); // Verificación del parámetro
  
    if (!isNaN(this.codMateria)) {
      this.modificarMateriaService.getMateriaById(this.codMateria).subscribe(
        materia => {
          if (materia) {
            this.materiaForm.patchValue(materia);
            this.loading = false;
          } else {
            Swal.fire('Error', 'No se encontró la materia', 'error');
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.error('Error al obtener la materia:', error);
          Swal.fire('Error', 'No se pudo cargar la materia', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Código de materia inválido', 'error');
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.materiaForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos obligatorios', 'warning');
      return;
    }

    const updatedMateria = this.materiaForm.value;
    this.modificarMateriaService.updateMateria(this.codMateria!, updatedMateria).subscribe(
      () => {
        Swal.fire('Modificación Guardada', 'La materia fue actualizada con éxito.', 'success');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al actualizar la materia:', error);
        Swal.fire('Error', 'No se pudo actualizar la materia', 'error');
      }
    );
  }

  cancelarEdicion() {
    this.router.navigate(['/home']);
  }
}
