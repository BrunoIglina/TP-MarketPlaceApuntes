import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterModule } from '@angular/router'; 
import { PublicadoService } from './publicado.service';
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
  numeroAlumno: number = 2; 

  constructor(private publicadoService: PublicadoService, private router: Router) {} 

  ngOnInit() {
    this.loadComprados();
  }

  loadComprados() {
    this.publicadoService.getPublicados(this.numeroAlumno).subscribe((data: any) => {
      this.apuntes = data;
    });
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
    this.currentPage = page;
  }

  verDetalles(apunteId: number) {
    this.router.navigate(['/note-detail', apunteId]); 
  }
}


