import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { ApunteService } from './apunte-comprado.service';

@Component({
  selector: 'app-apunte-comprado',
  standalone: true,
  templateUrl: './apunte-comprado.component.html',
  imports: [CommonModule, RouterModule, MatCardModule],
  styleUrls: ['./apunte-comprado.component.css']
})
export class ApunteCompradoComponent implements OnInit { @Input() note: any; 
  apunte: any;

  constructor(private noteDetailService: ApunteService, private route: ActivatedRoute, private router: Router) {}

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
  
  calificarApunte() {
    // Lógica para calificar el apunte
    console.log('Calificar apunte:', this.apunte);
    // Podrías mostrar un modal o redirigir a un formulario para calificar
  }
  comprarApunte() {
    // Lógica para comprar el apunte
    console.log('Comprar apunte:', this.apunte);
    // Aquí podrías llamar a un servicio para procesar la compra
  }
  
}
