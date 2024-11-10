import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AltaAlumnoService } from './alumno.service';

@Component({
  selector: 'app-alta-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './alta-alumno.component.html',
  styleUrls: ['./alta-alumno.component.css']
})
export class AltaAlumnoComponent {
  legajo: string = '';
  nombreUsuario: string = '';
  nombreApellido: string = '';
  email: string = '';
  telefono: string = '';
  contrasena: string = '';
  cvu: string = '';

  constructor(private router: Router, private alumnoService: AltaAlumnoService) {}

  onSubmit(): void {
    if (this.validateInputs()) {
      const newAlumno = {
        legajo_usuario: this.legajo,
        nombre_usuario: this.nombreUsuario,
        nombre_apellido_alumno: this.nombreApellido,
        email_usuario: this.email,
        telefono_usuario: this.telefono,
        contraseña_usuario: this.contrasena,
        CVU_MP: this.cvu
      };

      this.alumnoService.createAlumno(newAlumno).subscribe(
        () => {
          Swal.fire({
            title: 'Alumno Creado',
            text: 'El alumno ha sido creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: error.error.message || 'No se pudo crear el alumno. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  validateInputs(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      Swal.fire({
        title: 'Correo Inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }

    if (this.cvu.length < 10) {
      Swal.fire({
        title: 'CVU Inválido',
        text: 'El CVU debe tener al menos 10 números.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }

    return true;
  }
}