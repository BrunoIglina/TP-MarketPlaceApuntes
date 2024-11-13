import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfileAdminService } from './profile-admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ProfileAdminComponent implements OnInit {
  adminForm: FormGroup;
  editable: { [key: string]: boolean } = {
    nombre_apellido_alumno: false,
    telefono_usuario: false
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileAdminService: ProfileAdminService
  ) {
    this.adminForm = this.fb.group({
      nombre_usuario: [{ value: '', disabled: true }],
      nombre_apellido_alumno: ['', Validators.required],
      email_usuario: [{ value: '', disabled: true }],
      telefono_usuario: ['', Validators.required],
      rol_usuario: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    const admin = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.adminForm.patchValue(admin);
  }

  toggleEdit(field: string): void {
    this.editable[field] = !this.editable[field];
    if (this.editable[field]) {
      this.adminForm.get(field)?.enable();
    } else {
      this.adminForm.get(field)?.disable();
    }
  }

  guardarCambios(): void {
    if (this.adminForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos obligatorios', 'warning');
      return;
    }

    const adminData = this.adminForm.getRawValue();
    const numero_usuario = JSON.parse(localStorage.getItem('usuario') || '{}').numero_usuario;

    this.profileAdminService.updateAdmin(numero_usuario, adminData).subscribe(
      () => {
        Swal.fire('Datos Actualizados', 'Los datos fueron actualizados con éxito.', 'success');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al actualizar los datos:', error);
        Swal.fire('Error', 'No se pudieron actualizar los datos', 'error');
      }
    );
  }

  onChangePassword(): void {
    
  }

  crearNuevoAdmin(): void {
    this.router.navigate(['/alta-admin']);
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}