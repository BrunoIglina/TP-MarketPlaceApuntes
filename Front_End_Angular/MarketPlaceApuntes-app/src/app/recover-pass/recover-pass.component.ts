import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.css']
})
export class RecoverPassComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('Correo ingresado:', this.email);

    if (this.email.trim()) {
      // Aquí se debería incluir la lógica para enviar el código al correo electrónico.
      console.log('Correo enviado a:', this.email);

      // Redirigir al componente para introducir el código de verificación
      this.router.navigate(['/enter-token']);
    } else {
      // Mostrar un mensaje si el campo está vacío
      Swal.fire({
        title: 'Campo Vacío',
        text: 'Por favor, ingresa tu correo electrónico.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
