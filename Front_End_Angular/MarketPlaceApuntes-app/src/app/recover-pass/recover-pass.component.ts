import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VerifService } from './verif.service';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.css']
})
export class RecoverPassComponent {
  email: string = '';

  constructor(private router: Router, private verifService: VerifService) {}

  onSubmit(): void {
    if (this.email.trim()) {
      this.verifService.sendVerificationCode(this.email).subscribe(
        () => {
          Swal.fire({
            title: 'Código Enviado',
            text: 'Revisa tu correo electrónico para el código de verificación.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/enter-token'], { queryParams: { email: this.email } });
          });
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo enviar el código. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Campo Vacío',
        text: 'Por favor, ingresa tu correo electrónico.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}