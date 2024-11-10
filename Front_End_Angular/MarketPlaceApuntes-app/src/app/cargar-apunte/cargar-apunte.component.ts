import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { PublicadoService } from '../publicado/publicado.service';
import Swal from 'sweetalert2'; 
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-cargar-apunte',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './cargar-apunte.component.html',
  styleUrls: ['./cargar-apunte.component.css']
})
export class CargarApunteComponent {
  apunteForm: FormGroup;
  archivoApunte: File | null = null;
  archivoCaratula: File | null = null;
  fileErrorPdf: string | null = null;
  fileErrorJpg: string | null = null;
   numeroAlumno : number = 0;
   materias : any[] = [];

  constructor(
    private fb: FormBuilder,
    private publicadoService: PublicadoService,
    private homeService: HomeService,
    private router: Router
  ) {
    this.apunteForm = this.fb.group({
      titulo_apunte: ['', Validators.required],
      descripcion_apunte: [''],
      cod_materia: ['', Validators.required],
      monto_precio: [0, Validators.required]
    });
  }
  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.numeroAlumno = usuario.numero_usuario;this.homeService.getSubjects().subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.error('Error al obtener las materias: ', error);
      }
    );
  }
  onFileSelect(event: Event, type: 'pdf' | 'jpg'): void {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];

    if (type === 'pdf') {
      if (file && file.type === 'application/pdf') {
        this.archivoApunte = file;
        this.fileErrorPdf = null;
      } else {
        this.fileErrorPdf = 'Solo se permiten archivos PDF.';
        this.archivoApunte = null;
      }
    } else if (type === 'jpg') {
      if (file && file.type === 'image/jpeg') {
        this.archivoCaratula = file;
        this.fileErrorJpg = null;
      } else {
        this.fileErrorJpg = 'Solo se permiten archivos JPG.';
        this.archivoCaratula = null;
      }
    }
  }

  onSubmit(): void {
    if (this.apunteForm.valid && this.archivoApunte && this.archivoCaratula) {
      const formData = new FormData();
      formData.append('titulo_apunte', this.apunteForm.get('titulo_apunte')?.value);
      formData.append('descripcion_apunte', this.apunteForm.get('descripcion_apunte')?.value);
      formData.append('cod_materia', this.apunteForm.get('cod_materia')?.value);
      formData.append('numero_alumno', this.numeroAlumno.toString());
      formData.append('archivo_apunte', this.archivoApunte);
      formData.append('archivo_caratula', this.archivoCaratula);

      
      this.publicadoService.createApunte(formData).subscribe(
        (apunte) => {
          const apunteId = apunte.id_apunte;
          
          
          const precioData = {
            id_apunte: apunteId,
            monto_precio: this.apunteForm.get('monto_precio')?.value
          };
          
          this.publicadoService.createPrecio(precioData).subscribe(
            () => {
              Swal.fire({
                title: '¡Carga exitosa!',
                text: 'El apunte y su precio se han cargado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/publicado']).then(() => window.location.reload());
              });
            },
            (error) => {
              Swal.fire({
                title: 'Error al crear el precio',
                text: 'Ocurrió un error al intentar asignar el precio al apunte.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          );
        },
        (error) => {
          Swal.fire({
            title: 'Error al cargar el apunte',
            text: 'Ocurrió un error al intentar cargar el apunte. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('Formulario inválido o archivo no seleccionado.');
    }
  }
}