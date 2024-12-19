import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { ApunteService } from './apunte-comprado.service';
import { CalificacionDialogComponent } from '../comprado/calificacion-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-apunte-comprado',
  standalone: true,
  templateUrl: './apunte-comprado.component.html',
  imports: [CommonModule, RouterModule, MatCardModule, MatDialogModule],
  styleUrls: ['./apunte-comprado.component.css']
})
export class ApunteCompradoComponent implements OnInit { @Input() note: any; 
  apunte: any;
  numero_alumno: number = 0; 
  dialog: MatDialog;
  estado_apunte: string = '';
  constructor(private noteDetailService: ApunteService, private route: ActivatedRoute, private router: Router, dialog: MatDialog) {this.dialog = dialog;}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.numero_alumno = usuario.numero_usuario;
    this.loadApunte();
  }

  loadApunte() {
    if (this.note) {
      this.apunte = this.note;
      console.log('Apunte cargado:', this.apunte); 
      this.verificarEstadoApunte();
    } else {
      const apunteId = this.route.snapshot.paramMap.get('id');
      this.noteDetailService.getApunteById(apunteId).subscribe((data) => {
        this.apunte = data;
        console.log('Apunte desde servicio:', this.apunte); 
        this.verificarEstadoApunte();
      });
    }
  }
  

  
  calificarApunte(apunteId: number) {
    const dialogRef = this.dialog.open(CalificacionDialogComponent, {
      width: '250px',
      data: { apunteId }
    });
  
    dialogRef.afterClosed().subscribe((calificacion: number | null) => {
      if (calificacion !== null) {
        this.noteDetailService.calificarApunte(this.numero_alumno, apunteId, calificacion)
          .subscribe(response => {
            Swal.fire({
              icon: 'success',
              title: '¡Calificación guardada!',
              text: 'La calificación se ha aplicado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/comprado']);
            });
          }, error => {
            console.error('Error al guardar la calificación:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar la calificación',
              text: 'No se pudo guardar la calificación. Intente nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  }

  visualizarApunte() {
    if (this.apunte && this.apunte.archivo_apunte) {
      const base64Data = this.apunte.archivo_apunte.startsWith('data:') 
        ? this.apunte.archivo_apunte.split(',')[1] 
        : this.apunte.archivo_apunte;

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${this.apunte.titulo_apunte}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No hay un archivo de apunte disponible para descargar.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

verificarEstadoApunte() {
    if (this.apunte.estado_apunte === 'N') {
      Swal.fire({
        title: 'Apunte dado de baja',
        text: 'No puedes ver el detalle porque el apunte está dado de baja.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Descargar Apunte',
        cancelButtonText: 'Volver',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          this.visualizarApunte();
          this.router.navigate(['/comprado']); 
        } else {
          this.router.navigate(['/comprado']); 
        }
      });
    }
  }
}  
