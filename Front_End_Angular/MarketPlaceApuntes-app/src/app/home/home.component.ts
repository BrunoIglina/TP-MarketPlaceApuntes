import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteService } from './homeService'; // Importa el servicio

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, NoteDetailComponent]
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedSubject: any = null;
  selectedNote: any | null = null; 
  expandedYear: number | null = null;
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

  toggleYear(year: number) {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  getSubjectsForYear(year: number) {
    return this.subjects.filter(subject => subject.year === year && subject.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

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
    this.selectedNote = note;
  }

  goBack() {
    this.selectedNote = null;
  }

  resetHome() {
    this.selectedSubject = null;
    this.selectedNote = null;
    this.currentPage = 1;
    this.updatePagination();
  }

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

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  totalPages() {
    if (this.selectedSubject) {
      return Math.ceil(this.getNotesForSubject(this.selectedSubject).length / this.itemsPerPage);
    }
    return 0;
  }
}