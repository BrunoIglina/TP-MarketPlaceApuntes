import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};

export function confirmLogout(router: Router): Promise<boolean> {
  return Swal.fire({
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
      localStorage.removeItem('authToken'); // Limpiar el localStorage
      return router.navigate(['/login']).then(() => true);
    } else {
      return Promise.resolve(false);
    }
  });
}