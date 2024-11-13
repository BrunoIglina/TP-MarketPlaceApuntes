import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompradoService } from './comprado.service'; 
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterModule } from '@angular/router'; 
import { CalificacionDialogComponent } from './calificacion-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comprado',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    RouterModule, 
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  templateUrl: './comprado.component.html',
  styleUrls: ['./comprado.component.css']
})
export class CompradoComponent implements OnInit {
  apuntes: any[] = [];
  filteredApuntes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3; 
  numeroAlumno: number = 0; 
  defaultImage: string = '../../assets/AM1.jpg';
  searchForm: FormGroup;
  filteredOptions: Observable<any[]> = new Observable<any[]>(); 

  constructor(
    private compradoService: CompradoService, 
    private router: Router, 
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  } 

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.numeroAlumno = usuario.numero_usuario;
    this.loadComprados();

    this.filteredOptions = this.searchForm.get('search')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.searchForm.get('search')!.valueChanges.subscribe(value => {
      this.filteredApuntes = this._filter(value);
    });
  }
  
  loadComprados() {
    this.compradoService.getComprados(this.numeroAlumno).subscribe(
      (apuntes: any[]) => {
        const priceRequests = apuntes.map(apunte =>
          this.compradoService.getPrecioByApunteId(apunte.id_apunte).pipe(
            map(precio => ({
              ...apunte,
              precio: precio?.monto_precio || 'Sin precio'
            }))
          )
        );
  
        forkJoin(priceRequests).subscribe(
          apuntesConPrecio => {
            this.apuntes = apuntesConPrecio;
            this.filteredApuntes = apuntesConPrecio; 
          },
          error => console.error('Error al cargar los precios', error)
        );
      },
      error => console.error('Error al cargar apuntes', error)
    );
  }
  
  get paginatedApuntes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredApuntes.slice(start, end);
  }
  
  get totalPages() {
    return Math.ceil(this.filteredApuntes.length / this.itemsPerPage);
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  verDetalles(apunteId: number) {
    this.router.navigate(['/apunte-comprado', apunteId]); 
  }

  calificar(apunteId: number) {
    const dialogRef = this.dialog.open(CalificacionDialogComponent, {
      width: '250px',
      data: { apunteId }
    });
  
    dialogRef.afterClosed().subscribe((calificacion: number | null) => {
      if (calificacion !== null) {
        this.compradoService.calificarApunte(this.numeroAlumno, apunteId, calificacion)
          .subscribe(response => {
            Swal.fire({
              icon: 'success',
              title: '¡Calificación guardada!',
              text: 'La calificación se ha aplicado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.loadComprados(); 
            });
          }, error => {
            console.error('Error al guardar la calificación:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar la calificación',
              text: 'No se pudo guardar la calificación. Intente nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.apuntes.filter(apunte => apunte.titulo_apunte.toLowerCase().includes(filterValue));
  }

  clearSearch() {
    this.searchForm.get('search')!.setValue('');
    this.filteredApuntes = this.apuntes;
  }
}
