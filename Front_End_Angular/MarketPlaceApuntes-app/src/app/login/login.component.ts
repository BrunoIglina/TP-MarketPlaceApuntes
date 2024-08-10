import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

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
    } else {
      alert('Credenciales incorrectas');
    }
  }
}