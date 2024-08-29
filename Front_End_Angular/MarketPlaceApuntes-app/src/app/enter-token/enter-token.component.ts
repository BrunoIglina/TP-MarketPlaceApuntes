import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enter-token',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './enter-token.component.html',
  styleUrls: ['./enter-token.component.css']
})
export class EnterTokenComponent {
  verificationCode: string = '';
  constructor( private router: Router){}
  onSubmit(): void
   {
    // Lógica para verificar el código de verificación
    console.log('Código de verificación introducido:', this.verificationCode);
    if(this.verificationCode === "1234"){
      this.router.navigate(["/reset-password"]);
    }
    else
    {
        Swal.fire
        ({
          title: 'TOKEN INVALIDO',
          text: "VERIFICA el token enviado a tu correo electronico",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        })
      
    }
  }
}
