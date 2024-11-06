// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteService } from './homeService'; 

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
  subjectNotes: any[] = []; 

  previousScrollPosition: number = 0;


  years: number[] = [1, 2, 3, 4, 5]; 
  subjects: any[] = [
    
    { id: 1, name: 'Análisis Matemático I', year: 1 },
    { id: 2, name: 'Física I', year: 1 },
    { id: 3, name: 'Algebra y Geometria', year: 1 },
    { id: 4, name: 'Arquitectura De Las Computadoras', year: 1 },
    { id: 5, name: 'Ingles I', year: 1 },
    { id: 6, name: 'Logica y estructuras Discretas', year: 1 },
    { id: 7, name: 'Sistemas y procesos de negocio', year: 1 },
    { id: 8, name: 'Análisis de Sistemas De Informacion', year: 2 },
    { id: 9, name: 'Análisis Matematico 2', year: 2 },
    { id: 10, name: 'Fisica II', year: 2 },
    { id: 11, name: 'Ingenieria y sociedad', year: 2 },
    { id: 12, name: 'Ingles II', year: 2 },
    { id: 13, name: 'Paradigmas de Programación', year: 2 },
    { id: 14, name: 'Sintaxis y Semántica de los Lenguajes', year: 2 },
    { id: 15, name: 'Sistemas Operativos', year: 2 },
    { id: 16, name: 'Diseño de Sistemas', year: 3 },
    { id: 17, name: 'Administración de Sistemas de Informacíon', year: 4 },
    { id: 18, name: 'Proyecto Final', year: 5 }
    
  ];

  notes: any[] = [
    
    { subjectId: 1, title: 'Apunte de Análisis Matemático I', description: 'Resumen del Parcial 1', cover: 'assets/AM1.jpg', price: 1500 },
    { subjectId: 1, title: 'Apunte de Análisis Matemático I', description: 'Resumen del Parcial 2', cover: 'assets/AM1.jpg', price: 3200 },
    { subjectId: 1, title: 'Apunte de Análisis Matemático I', description: 'Resumen del año', cover: 'assets/AM1.jpg', price: 6500 },
    { subjectId: 1, title: 'Apunte de Análisis Matemático I', description: 'Resumen del Parcial 3', cover: 'assets/AM1.jpg', price: 1200 },
    { subjectId: 1, title: 'Apunte de Análisis Matemático I', description: 'Resumen de Teoria Anual', cover: 'assets/AM1.jpg', price: 2000 },
    { subjectId: 1, title: 'Apunte de Análisis Matemático I', description: 'Resumen de Practica anual', cover: 'assets/AM1.jpg', price: 600 },
    { subjectId: 2, title: 'Apunte de Física I', description: 'Resumen del tema Y', cover: 'assets/fis1.png', price: 250 },
    
  ];
  selectedSubjectNotes: any[] = []; 
  paginatedNotes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService 
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['reset'] === 'true') {
        this.resetHome();
        this.router.navigate(['/home'], { queryParams: { reset: null } });
      } else {
        this.updatePagination();
      }
    });
  }


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
  selectSubject(subject: any) {
    this.selectedSubject = subject;
    this.currentPage = 1;


    this.noteService.getNotesBySubjectId(1).subscribe(
      (data) => {
        this.selectedSubjectNotes = data;
        this.updatePagination();
      },
      (error) => {
        console.error('Error al obtener los apuntes:', error);
      }
    );
  }

  selectNote(note: any) {
    if (note && note.id_apunte) {
      this.router.navigate(['/compra-apunte', note.id_apunte]); 
    } else {
      console.error('El ID del apunte no está definido:', note);
    }

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
  getNotesForSubject(subject: any) {
    return this.selectedSubjectNotes; 
  }

  updatePagination() {
    if (this.selectedSubject) {
      this.paginatedNotes = this.getNotesForSubject(this.selectedSubject).slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    } else {
      this.paginatedNotes = [];
    }
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
    this.subjectNotes = []; 
  }
}







