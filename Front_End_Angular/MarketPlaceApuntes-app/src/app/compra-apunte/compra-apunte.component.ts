import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home/home.service'; 
import { NoteDetailService } from '../note-detail/note-detail.service'; 
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CompraService } from './compra.service';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-compra-apunte',
  templateUrl: './compra-apunte.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  styleUrls: ['./compra-apunte.component.css']
})
export class CompraApunteComponent implements OnInit {
  apunte: any;
  precio: any; 
  numero_alumno : number = 0; 
  rol_usuario: string = '';
  @Input() noteId!: number; 
  private readonly numeroAdmin: number = 1;
  estado_apunte: string = '';
  estado_materia: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: HomeService,
    private noteDetailService: NoteDetailService,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.numero_alumno = usuario.numero_usuario;
    this.rol_usuario = usuario.rol_usuario;
    const id = this.noteId || +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.cargarApunte(id);
    }
  }

  cargarApunte(id: number): void {
    this.noteService.obtenerApuntePorId(id).subscribe(
      (data) => {
        this.apunte = data;
        this.cargarPrecio(id); 
      },
      (error) => {
        console.error('Error al cargar el apunte:', error);
      }
    );
  }

  cargarPrecio(apunteId: number): void {
    this.noteDetailService.getPrecioByApunteId(apunteId).subscribe(
      (data) => {
        this.precio = data; 
      },
      (error) => {
        console.error('Error al cargar el precio:', error);
      }
    );
  }

  comprar(): void {
    if (this.numero_alumno === this.apunte.numero_alumno) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes comprar tu propio apunte.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (this.apunte.estado_apunte === 'N' ) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes comprar un apunte deshabilitado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
   /* if ( this.apunte.materia.estado_materia === 'N') {
      Swal.fire({
        title: 'Error',
        text: 'No puedes comprar un apunte de una materia deshabilitada',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }*/
    if (this.numero_alumno === this.apunte.numero_alumno) {
      Swal.fire({
        title: 'Error',
        text: 'No puedes comprar tu propio apunte.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      title: 'Confirmación',
      text: 'Será redirigido a MercadoPago y deberá apretar el botón comprar nuevamente. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.verificarCompra(this.numero_alumno, this.apunte.id_apunte).subscribe(
          (compra) => {
            if (compra) {
              Swal.fire({
                title: 'Ya compraste este apunte',
                text: 'No puedes comprar el mismo apunte dos veces.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            } else {
              this.crearPreferenciaYRedirigir();
            }
          },
          (error) => {
            if (error.status === 404) {
              this.crearPreferenciaYRedirigir();
            } else {
              console.error('Error al verificar la compra:', error);
            }
          }
        );
      }
    });
  }
  
  crearPreferenciaYRedirigir(): void {
    const preferenciaData = {
      title: this.apunte.titulo_apunte,
      unit_price: this.precio.monto_precio,
      quantity: 1,
      numero_alumno: this.numero_alumno,
      id_apunte: this.apunte.id_apunte
    };
  
    this.compraService.crearPreferencia(preferenciaData).subscribe(
      (response) => {
        if (response.id) {
          this.router.navigate(['/mercado-pago'], { queryParams: { preferenceId: response.id, apunteId: this.apunte.id_apunte } });
        } else {
          console.error('No se recibió un ID de preferencia válido');
        }
      },
      (error) => {
        console.error('Error al crear la preferencia de pago:', error);
      }
    );
  }

  borrarApunte(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el apunte y sancionará al alumno.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.deleteApunte(this.apunte.id_apunte, this.numeroAdmin).subscribe(
          response => {
            console.log('Apunte eliminado', response);
            Swal.fire({
              title: 'Eliminado',
              text: 'El apunte ha sido eliminado y el alumno sancionado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/home']); 
            });
          },
          error => {
            console.error('Error al eliminar el apunte', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el apunte.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }
}