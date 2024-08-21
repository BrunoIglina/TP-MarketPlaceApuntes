import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  loginData = { legajo: '', password: '' };

  constructor(private router: Router) {}

  validarInicio(): void 
  {
    if (this.loginData.legajo === '11111' && this.loginData.password === 'admin') {
      localStorage.setItem('authToken', 'someToken'); 
      this.router.navigate(['/home']); 
    } else 
    {
      Swal.fire
      ({
        title: 'CREDENCIALES DE ACCESO INCORRECTAS',
        text: "Ingresa legajo y contraseña nuevamente",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      })
    }
  }
}