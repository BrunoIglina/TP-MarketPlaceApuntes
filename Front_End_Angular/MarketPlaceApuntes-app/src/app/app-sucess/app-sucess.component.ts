import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraService } from '../compra-apunte/compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success',
  templateUrl: './app-sucess.component.html',
  standalone: true,
  styleUrls: ['./app-sucess.component.css']
})
export class AppSucessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    const externalReference = this.route.snapshot.queryParamMap.get('external_reference');
    const paymentId = this.route.snapshot.queryParamMap.get('payment_id');
    const status = this.route.snapshot.queryParamMap.get('status');

    if (externalReference && paymentId && status === 'approved') {
      const [numero_alumno, id_apunte] = externalReference.split('-');

      const compraData = {
        numero_alumno: parseInt(numero_alumno, 10),
        id_apunte: parseInt(id_apunte, 10),
        idPago: paymentId
      };

      this.compraService.crearCompra(compraData).subscribe(
        (response) => {
          console.log('Compra guardada en la base de datos:', response);
          Swal.fire({
            title: '¡Compra Exitosa!',
            text: 'Has comprado el apunte correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/comprado']);
          });
        },
        (error) => {
          console.error('Error al guardar la compra:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al guardar la compra.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('Faltan parámetros en la URL o el pago no fue aprobado');
      Swal.fire({
        title: 'Error',
        text: 'Faltan parámetros en la URL o el pago no fue aprobado.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}