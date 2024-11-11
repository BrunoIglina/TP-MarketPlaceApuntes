import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() autenticado: boolean = false;
  rol_usuario: string = ''; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol_usuario = usuario.rol_usuario; 
  }

  onLogoutClick() {
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      text: "¡Te redirigirás al Login!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
    });
  }

  onHomeClick() {
    this.router.navigate(['/home'], { queryParams: { reset: 'true' } });
  }

  onCreateMateriaClick() {
    this.router.navigate(['/agregar-materia']);
  }
}