import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NoteDetailService } from './note-detail.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() note: any; // Asegúrate de que esta propiedad esté aquí
  apunte: any;

  constructor(private noteDetailService: NoteDetailService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loadApunte();
  }

  loadApunte() {
    if (this.note) {
      
      this.apunte = this.note;
    } else {
      const apunteId = this.route.snapshot.paramMap.get('id');
      this.noteDetailService.getApunteById(apunteId).subscribe((data) => {
        this.apunte = data;
      });
    }
  }
  editarApunte() {
    // Lógica para editar el apunte
    // Podrías redirigir a un formulario de edición, por ejemplo
    console.log('Editar apunte:', this.apunte);
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
    }}
  
  
  
}
