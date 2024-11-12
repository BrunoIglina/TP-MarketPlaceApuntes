import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms'; 
import { NoteDetailService } from './note-detail.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule], 
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() note: any; 
  apunte: any = null; 
  loading: boolean = true; 
  editingPrice: boolean = false;
  nuevoPrecio: number | null = null;

  constructor(
    private noteDetailService: NoteDetailService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadApunte();
  }
  
  loadApunte() {
    if (this.note) {
      this.apunte = this.note;
      this.loading = false; 
    } else {
      const apunteIdString = this.route.snapshot.paramMap.get('id');
      
      if (!apunteIdString) {
        console.error('El ID del apunte no está disponible');
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo cargar el apunte. ID no válido.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.loading = false;
        return; 
      }
  
      
      const apunteId = Number(apunteIdString);
      if (isNaN(apunteId)) {
        console.error('El ID del apunte no es un número válido');
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'El ID del apunte no es válido.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return; 
      }
  
      
      const precioRequest = this.noteDetailService.getPrecioByApunteId(apunteId); 
      const apunteRequest = this.noteDetailService.getApunteById(apunteIdString); 
  
      forkJoin([apunteRequest, precioRequest]).subscribe({
        next: ([apunte, precio]) => {
          this.apunte = apunte;
          this.apunte.precio = precio?.monto_precio || 'Sin precio disponible';
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar el apunte o el precio:', err);
          this.loading = false; 
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo cargar el apunte o el precio.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
  

  editarApunte() {
    this.router.navigate(['/edicionApunte', this.apunte.id_apunte]);
}

  
  async borrarApunte() {
    const apunteId = this.apunte.id_apunte; 

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esto eliminará el apunte permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      this.noteDetailService.deleteApunte(apunteId).subscribe({
        next: () => {
          Swal.fire({
            title: 'Eliminado!',
            text: 'El apunte se eliminó con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.error('Error al eliminar el apunte:', err);
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo eliminar el apunte.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
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

  editarPrecio() {
    this.editingPrice = true;
  }

  cancelarEdicion() {
    this.editingPrice = false;
    this.nuevoPrecio = null;
  }

  guardarPrecio() {
    if (this.nuevoPrecio !== null && this.nuevoPrecio > 0) {
      const precioData = {
        id_apunte: this.apunte.id_apunte,
        monto_precio: this.nuevoPrecio
      };
  
      this.noteDetailService.createPrecio(precioData).subscribe({
        next: () => {
          Swal.fire('¡Precio Actualizado!', 'El nuevo precio ha sido guardado.', 'success').then(() => {
            
            this.router.navigate(['/publicado']); 
          });
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error al guardar el precio:', err);
          Swal.fire('Error', 'No se pudo guardar el nuevo precio.', 'error');
        }
      });
    } else {
      Swal.fire('Precio inválido', 'Por favor, ingresa un precio válido.', 'warning');
    }
  }}
