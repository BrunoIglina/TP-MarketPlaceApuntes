import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApunteCompradoComponent } from '../apunte-comprado/apunte-comprado.component';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  { path: './apunte-comprado.component/:id', component: ApunteCompradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


@Component({
  selector: 'app-comprado',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './comprado.component.html',
  styleUrls: ['./comprado.component.css']
})
export class CompradoComponent {

  items: Array<{ imagenUrl: string, titulo: string }> = [
    { imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Primer adquirido' },
    { imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Producto 2' },
    { imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Producto 3' },
    { imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Producto 4' },
    { imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Producto 5' },
    { imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Producto 6' },
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
