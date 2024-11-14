import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VerifService } from '../recover-pass/verif.service';

@Component({
  selector: 'app-enter-token',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './enter-token.component.html',
  styleUrls: ['./enter-token.component.css']
})
export class EnterTokenComponent {
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private authService: VerifService) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onSubmit(): void {
    if (this.verificationCode.trim() && this.newPassword.trim()) {
      this.authService.verifyCodeAndChangePassword(this.email, this.verificationCode, this.newPassword).subscribe(
        () => {
          Swal.fire({
            title: 'Contraseña Actualizada',
            text: 'Tu contraseña ha sido actualizada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar la contraseña. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Campos Vacíos',
        text: 'Por favor, ingresa el código de verificación y la nueva contraseña.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
