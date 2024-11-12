import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AgregarMateriaService } from './agregar-materia.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agregar-materia',
  standalone: true,
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class AgregarMateriaComponent implements OnInit {
  materiaForm: FormGroup;
  loading: boolean = false;
  private readonly numero_admin: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agregarMateriaService: AgregarMateriaService
  ) {
    this.materiaForm = this.fb.group({
      nombre_materia: ['', Validators.required],
      nivel_carrera: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.materiaForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos obligatorios', 'warning');
      return;
    }

    const nuevaMateria = {
      ...this.materiaForm.value,
      numero_admin: this.numero_admin,
    };

    this.agregarMateriaService.createMateria(nuevaMateria).subscribe(
      () => {
        Swal.fire('Materia Creada', 'La materia fue agregada con éxito.', 'success');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al crear la materia:', error);
        Swal.fire('Error', 'No se pudo crear la materia', 'error');
      }
    );
  }

  cancelarCreacion() {
    this.router.navigate(['/home']);
  }
}


