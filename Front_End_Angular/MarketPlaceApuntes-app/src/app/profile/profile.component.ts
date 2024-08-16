import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile',
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
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleEdit(campo: 'nombre' | 'apellido' | 'mail' | 'telefono' | 'contrasena' | 'reputacionE', inputElement: HTMLElement) {
    this.editable[campo] = !this.editable[campo];
    if (this.editable[campo])
      {
        setTimeout(() => inputElement.focus(), 0 );
      }
  }
}

