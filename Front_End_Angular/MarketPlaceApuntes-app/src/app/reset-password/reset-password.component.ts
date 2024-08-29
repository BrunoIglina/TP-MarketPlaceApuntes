import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.newPassword === this.confirmPassword) {
      // Aquí se debería incluir la lógica para actualizar la contraseña en la base de datos.
      console.log('Nueva contraseña establecida:', this.newPassword);

      // Redirigir al login después de establecer la nueva contraseña
      this.router.navigate(['/login']);
      Swal.fire({
        title: 'Contraseña cambiada',
        text: 'Haz cambiado la contraseña correctamente, volverás al LOGIN',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    } else {
      // Mostrar un mensaje si las contraseñas no coinciden
      Swal.fire({
        title: 'Contraseñas No Coinciden',
        text: 'Las contraseñas ingresadas no coinciden. Por favor, inténtelo de nuevo.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
