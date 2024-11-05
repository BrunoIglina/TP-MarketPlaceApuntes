// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class HomeComponent implements OnInit {
  years: number[] = [1, 2, 3, 4, 5];
  subjectsByYear: { [key: number]: any[] } = {};
  expandedYear: number | null = null;
  selectedSubject: any = null;
  confirmSubjectId: number | null = null;
  subjectNotes: any[] = []; // Nueva propiedad para almacenar los apuntes

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.homeService.getSubjects().subscribe((data: any[]) => {
      console.log('Materias obtenidas:', data);
      this.subjectsByYear = this.groupSubjectsByYear(data);
      console.log('Materias agrupadas por año:', this.subjectsByYear);
    });
  }

  private groupSubjectsByYear(subjects: any[]): { [key: number]: any[] } {
    return subjects.reduce((acc, subject) => {
      const year = subject.nivel_carrera;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(subject);
      return acc;
    }, {} as { [key: number]: any[] });
  }

  toggleYear(year: number): void {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  getSubjectsForYear(year: number): any[] {
    return this.subjectsByYear[year] || [];
  }

  selectSubject(subject: any): void {
    this.selectedSubject = subject; // Almacenar la materia seleccionada
    this.loadSubjectNotes(subject.cod_materia); // Cargar apuntes de la materia seleccionada
  }

  private loadSubjectNotes(subjectId: number): void {
    this.homeService.getSubjectNotes(subjectId).subscribe(
      (notes: any[]) => {
        this.subjectNotes = notes; // Almacenar los apuntes
        console.log('Apuntes de la materia:', this.subjectNotes);
      },
      (error) => {
        console.error('Error al obtener apuntes:', error);
        Swal.fire('Error', 'No se pudieron cargar los apuntes de la materia.', 'error');
      }
    );
  }

  confirmDelete(subjectId: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSubject(subjectId);
      }
    });
  }

  deleteSubject(subjectId: number): void {
    console.log('Eliminando materia con ID:', subjectId);
    this.homeService.deleteSubject(subjectId).subscribe(
      () => {
        this.getSubjects();
        Swal.fire('Eliminado', 'La materia ha sido eliminada.', 'success');
      },
      (error) => {
        console.error('Error al eliminar la materia:', error);
        Swal.fire('Error', 'No se pudo eliminar la materia.', 'error');
      }
    );
  }

  editSubject(subjectId: number): void {
    console.log('Editar materia con ID:', subjectId);
    this.router.navigate(['/modificar-materia', subjectId]);
  }

  resetHome(): void {
    this.selectedSubject = null;
    this.subjectNotes = []; // Limpiar apuntes al restablecer
  }
}







