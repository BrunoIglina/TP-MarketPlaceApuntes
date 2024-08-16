import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comprado',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './comprado.component.html',
  styleUrls: ['./comprado.component.css']
})
export class CompradoComponent {

  items: Array<{ imagenUrl: string, titulo: string }> = [
    { imagenUrl: 'url1.jpg', titulo: 'Producto 1' },
    { imagenUrl: 'url2.jpg', titulo: 'Producto 2' },
    { imagenUrl: 'url3.jpg', titulo: 'Producto 3' },
    { imagenUrl: 'url4.jpg', titulo: 'Producto 4' },
    { imagenUrl: 'url5.jpg', titulo: 'Producto 5' },
    { imagenUrl: 'url6.jpg', titulo: 'Producto 6' },
    // ... otros productos
  ];

  pageIndex: number = 0;
  pageSize: number = 3;

  get paginatedItems(): Array<{ imagenUrl: string, titulo: string }> {
    const startIndex = this.pageIndex * this.pageSize;
    return this.items.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if ((this.pageIndex + 1) * this.pageSize < this.items.length) {
      this.pageIndex++;
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }
}
