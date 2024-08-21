import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  showPassword: boolean = false;
  editable = {
    legajo: false,
    nombre: false,
    apellido: false,
    mail: false,
    telefono: false,
    contrasena: false,
    reputacionE: false,
  };

  legajo = '11111';
  nombre = 'Juan';
  apellido = 'Pérez';
  mail = 'juan.perez@example.com';
  telefono = '123456789';
  contrasena = 'admin';
  reputacionE = '7.5';
  
  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleEdit(campo: 'nombre' | 'apellido' | 'mail' | 'telefono' | 'contrasena' | 'reputacionE', inputElement: HTMLElement) {
    this.editable[campo] = !this.editable[campo];
    if (this.editable[campo]) {
      setTimeout(() => inputElement.focus(), 0);
    }
  }

  onChangePassword(): void {
    Swal.fire({
      title: 'Cambiar Contraseña',
      text: '¿Deseas cambiar tu contraseña? Cerrarás sesión!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/recover-pass']);
      }
    });
  }
}
