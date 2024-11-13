import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showPassword: boolean = false;
  editable = {
    legajo: false,
    nombre: false,
    apellido: false,
    mail: false,
    telefono: false,
    contrasena: false,
    reputacionE: false,
    cvu: false
  };

  legajo: string = '';
  nombre: string = '';
  apellido: string = '';
  mail: string = '';
  telefono: string = '';
  contrasena: string = '';
  reputacionE: string = '';
  cvu: string = '';
  numeroAlumno: number = 0;

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.legajo = usuario.legajo_usuario || '';
    this.nombre = usuario.nombre_usuario || '';
    this.apellido = usuario.nombre_apellido_alumno || '';
    this.mail = usuario.email_usuario || '';
    this.telefono = usuario.telefono_usuario || '';
    this.contrasena = usuario.contraseña_usuario || '';
    this.reputacionE = usuario.reputacion_usuario || '';
    this.cvu = usuario.CVU_MP || '';
    this.numeroAlumno = usuario.numero_usuario || 0;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleEdit(campo: 'nombre' | 'apellido' | 'mail' | 'telefono' | 'contrasena' | 'reputacionE' | 'cvu', inputElement: HTMLElement) {
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

  guardarCambios(): void {
    const updatedAlumno = {
      nombre_usuario: this.nombre,
      nombre_apellido_alumno: this.apellido,
      email_usuario: this.mail,
      telefono_usuario: this.telefono,
      CVU_MP: this.cvu
    };

    this.profileService.updateAlumno(this.numeroAlumno, updatedAlumno).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: '¡Datos actualizados!',
          text: 'Tus datos han sido actualizados correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          localStorage.setItem('usuario', JSON.stringify(response));
          this.router.navigate(['/home']);
        });
      },
      error => {
        console.error('Error al actualizar los datos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'No se pudo actualizar tus datos. Intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}
