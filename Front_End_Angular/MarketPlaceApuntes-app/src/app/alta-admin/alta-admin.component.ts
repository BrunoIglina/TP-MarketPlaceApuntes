import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AltaAdminService } from './alta-admin.service';

@Component({
  selector: 'app-alta-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent {
  nombreUsuario: string = '';
  nombreApellido: string = '';
  email: string = '';
  telefono: string = '';
  contrasena: string = '';

  constructor(private router: Router, private adminService: AltaAdminService) {}

  onSubmit(): void {
    if (this.validateInputs()) {
      const newAdmin = {
        nombre_usuario: this.nombreUsuario,
        nombre_apellido_alumno: this.nombreApellido,
        email_usuario: this.email,
        telefono_usuario: this.telefono,
        contraseña_usuario: this.contrasena,
        rol_usuario: 'Administrador' // Rol fijo para administrador
      };

      this.adminService.createAdmin(newAdmin).subscribe(
        () => {
          Swal.fire({
            title: 'Administrador Creado',
            text: 'El administrador ha sido creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: error.error.message || 'No se pudo crear el administrador. Intenta nuevamente.',
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

    return true;
  }
}
