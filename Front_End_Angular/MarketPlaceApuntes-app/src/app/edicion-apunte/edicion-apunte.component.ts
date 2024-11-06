import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NoteDetailService } from '../note-detail/note-detail.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edicion-apunte',
  standalone: true,
  templateUrl: './edicion-apunte.component.html',
  styleUrls: ['./edicion-apunte.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class EdicionApunteComponent implements OnInit {
  apunteForm: FormGroup;
  fileErrorPdf: string = '';
  fileErrorJpg: string = '';
  apunteId: number | null = null;
  loading: boolean = true;
  pdfFileName: string = '';
  jpgFileName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noteDetailService: NoteDetailService
  ) {
    this.apunteForm = this.fb.group({
      titulo_apunte: ['', Validators.required],
      descripcion_apunte: ['', Validators.required],
      cod_materia: ['', Validators.required],
      descripcion_mod_apunte: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apunteId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.apunteId)) {
      this.noteDetailService.getApunteById(String(this.apunteId)).subscribe(
        apunte => {
          if (apunte) {
            this.apunteForm.patchValue(apunte);
            this.pdfFileName = apunte.archivo_apunte ? 'Archivo PDF cargado' : 'No hay archivo PDF';
            this.jpgFileName = apunte.archivo_caratula ? 'Carátula cargada' : 'No hay carátula';
            this.loading = false;
          } else {
            Swal.fire('Error', 'No se encontró el apunte', 'error');
            this.router.navigate(['/note-detail', this.apunteId]);
          }
        },
        error => {
          console.error('Error al obtener el apunte:', error);
          Swal.fire('Error', 'No se pudo cargar el apunte', 'error');
        }
      );
    }
  }

  onSubmit() {
    if (this.apunteForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos obligatorios', 'warning');
      return;
    }

    const updatedApunte = this.apunteForm.value;
    this.noteDetailService.updateApunte(String(this.apunteId), updatedApunte).subscribe(
      () => {
        Swal.fire('Modificación Guardada', 'El apunte fue actualizado con éxito.', 'success');
        this.router.navigate(['/note-detail', this.apunteId]);
      },
      error => {
        console.error('Error al actualizar el apunte:', error);
        Swal.fire('Error', 'No se pudo actualizar el apunte', 'error');
      }
    );
  }

  cancelarEdicion() {
    this.router.navigate(['/note-detail', this.apunteId]);
  }
}
