import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service'; 
import { NoteDetailService } from '../note-detail/note-detail.service'; 
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  styleUrls: ['./mercado-pago.component.css']
})
export class MercadoPagoComponent implements OnInit {
  preferenceId: string | null = null;
  apunte: any;
  precio: any;

  constructor(
    private route: ActivatedRoute,
    private noteService: HomeService,
    private noteDetailService: NoteDetailService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.preferenceId = params.get('preferenceId');
      const apunteId = params.get('apunteId');
      if (this.preferenceId && apunteId) {
        console.log('Preference ID recibido:', this.preferenceId);
        this.loadMercadoPago(this.preferenceId);
        this.cargarApunte(+apunteId);
      } else {
        console.error('No se recibió un Preference ID válido o un Apunte ID válido');
      }
    });
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

  loadMercadoPago(preferenceId: string): void {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      console.log('Script de Mercado Pago cargado');
      const mp = new (window as any).MercadoPago('APP_USR-73c3246d-42bc-45d8-993e-04e89916a65d', {
        locale: 'es-AR'
      });

      mp.bricks().create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId,
        },
      }).then(() => {
        console.log('Widget de Mercado Pago inicializado');
      }).catch((error: any) => {
        console.error('Error al inicializar el widget de Mercado Pago:', error);
      });
    };
    script.onerror = () => {
      console.error('Error al cargar el script de Mercado Pago');
    };
    document.body.appendChild(script);
  }
}
