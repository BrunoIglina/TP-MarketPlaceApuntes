import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginData = { legajo: '', password: '' };

  constructor(private router: Router, private loginService: LoginService) {}

  validarInicio(): void {
    this.loginService.login(this.loginData.legajo, this.loginData.password).subscribe(
      response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.router.navigate(['/home']);
      },
      error => {
        Swal.fire({
          title: 'CREDENCIALES DE ACCESO INCORRECTAS',
          text: "Ingresa legajo y contraseña nuevamente",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  navigateToUserLogin(): void {
    this.router.navigate(['/login']);
  }
}
