import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterModule } from '@angular/router'; 
import { PublicadoService } from './publicado.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-publicado',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule], 
  templateUrl: './publicado.component.html',
  styleUrls: ['./publicado.component.css']
})
export class PublicadoComponent implements OnInit {
  apuntes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3; 
  numeroAlumno: number = 1; 
  defaultImage: string = '../../assets/AM1.jpg';
  

  constructor(private publicadoService: PublicadoService, private router: Router) {} 

  ngOnInit() {
    this.loadComprados();
  }
  
  loadComprados() {
    this.publicadoService.getPublicados(this.numeroAlumno).subscribe(
      (apuntes: any[]) => {
        const priceRequests = apuntes.map(apunte =>
          this.publicadoService.getPrecioByApunteId(apunte.id_apunte).pipe(
            map(precio => ({
              ...apunte,
              precio: precio?.monto_precio || 'Sin precio'
            }))
          )
        );
  
        forkJoin(priceRequests).subscribe(
          apuntesConPrecio => {
            this.apuntes = apuntesConPrecio;
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
    return this.apuntes.slice(start, end);
  }
  
  get totalPages() {
    return Math.ceil(this.apuntes.length / this.itemsPerPage);
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  verDetalles(apunteId: number) {
    this.router.navigate(['/note-detail', apunteId]); 
  }
  
  irACargarApunte() {
    this.router.navigate(['/cargar-apunte']);
  }}
