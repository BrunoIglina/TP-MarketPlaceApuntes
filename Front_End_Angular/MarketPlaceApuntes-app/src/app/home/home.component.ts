import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, MatCardModule]
})
export class HomeComponent implements OnInit {
  years: number[] = [1, 2, 3, 4, 5];
  subjectsByYear: { [key: number]: any[] } = {};
  expandedYear: number | null = null;
  selectedSubject: any = null;
  subjectNotes: any[] = [];
  paginatedNotes: any[] = [];
  allNotes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  defaultImage: string = '../../assets/AM1.jpg';
  rol_usuario: string = '';
  
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol_usuario = usuario.rol_usuario; 
    console.log('Usuario del localStorage:', usuario);
    this.route.queryParams.subscribe(params => {
      if (params['reset'] === 'true') {
        this.resetHome();
        this.router.navigate(['/home'], { queryParams: { reset: null } });
      } else {
        this.updatePagination();
      }
    });
    this.getSubjects();
  }

  getSubjects(): void {
    this.homeService.getSubjects().subscribe((data: any[]) => {
      this.subjectsByYear = this.groupSubjectsByYear(data);
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

  getSubjectsForYear(year: number): any[] {
    return this.subjectsByYear[year] || [];
  }

  toggleYear(year: number): void {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  selectSubject(subject: any): void {
    this.selectedSubject = subject;
    this.loadSubjectNotes(subject.cod_materia);
  }

  private loadSubjectNotes(subjectId: number): void {
    this.homeService.getSubjectNotes(subjectId).subscribe(
      (notes: any[]) => {
        const priceRequests = notes.map(note =>
          this.homeService.getPrecioByApunteId(note.id_apunte).pipe(
            map(precio => ({
              ...note,
              precio: precio?.monto_precio || 'Sin precio'
            }))
          )
        );

        forkJoin(priceRequests).subscribe(
          notesWithPrices => {
            this.subjectNotes = notesWithPrices;
            this.updatePagination();
          },
          error => console.error('Error al cargar los precios', error)
        );
      },
      (error) => {
        console.error('Error al obtener apuntes:', error);
        Swal.fire('Error', 'No se pudieron cargar los apuntes de la materia.', 'error');
      }
    );
  }

  getAllNotes(): void {
    this.homeService.getAllNotes().subscribe(
      (notes: any[]) => {
        const priceRequests = notes.map(note =>
          this.homeService.getPrecioByApunteId(note.id_apunte).pipe(
            map(precio => ({
              ...note,
              precio: precio?.monto_precio || 'Sin precio'
            }))
          )
        );

        forkJoin(priceRequests).subscribe(
          notesWithPrice => {
            this.allNotes = notesWithPrice;
            console.log('Todos los apuntes:', this.allNotes);
          },
          error => console.error('Error al cargar los precios', error)
        );
      },
      error => {
        console.error('Error al obtener todos los apuntes:', error);
        Swal.fire('Error', 'No se pudieron cargar todos los apuntes.', 'error');
      }
    );
  }

  

  updatePagination(): void {
    if (this.selectedSubject) {
      this.paginatedNotes = this.subjectNotes.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    } else {
      this.paginatedNotes = [];
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.subjectNotes.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  selectNoteDetails(noteId: number): void {
    this.router.navigate(['/compra-apunte', noteId]);
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
    this.router.navigate(['/modificar-materia', subjectId]);
  }

  resetHome(): void {
    this.selectedSubject = null;
    this.subjectNotes = [];
    this.paginatedNotes = [];
  }
}

