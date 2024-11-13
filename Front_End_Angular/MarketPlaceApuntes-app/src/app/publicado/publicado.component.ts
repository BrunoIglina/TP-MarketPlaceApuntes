import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterModule } from '@angular/router'; 
import { PublicadoService } from './publicado.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-publicado',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, MatDialogModule], 
  templateUrl: './publicado.component.html',
  styleUrls: ['./publicado.component.css']
})
export class PublicadoComponent implements OnInit {
  apuntes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  numeroAlumno: number = 0; 
  defaultImage: string = '../../assets/AM1.jpg';
  modalContent: string = ''; 

  constructor(private publicadoService: PublicadoService, private router: Router, public dialog: MatDialog) {} 

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.numeroAlumno = usuario.numero_usuario;
    this.loadComprados();
  }
  
  loadComprados() {
    this.publicadoService.getPublicados(this.numeroAlumno).subscribe(
      (apuntes: any[]) => {
        const requests = apuntes.map(apunte =>
          forkJoin({
            precio: this.publicadoService.getPrecioByApunteId(apunte.id_apunte),
            compras: this.publicadoService.getComprasByApunteId(apunte.id_apunte)
          }).pipe(
            map(({ precio, compras }) => ({
              ...apunte,
              precio: precio?.monto_precio || 'Sin precio',
              compras: compras || 0
            }))
          )
        );
  
        forkJoin(requests).subscribe(
          apuntesConDatos => {
            this.apuntes = apuntesConDatos;
          },
          error => console.error('Error al cargar los datos', error)
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
  }

  abrirModal() {
    this.modalContent = 'El total a remunerar por sus ventas será enviado en un plazo de 10 días hábiles al CVU proporcionado. ' + 
                        'Verifique que su CVU sea correcto en la sección de "Mi perfil".';
    this.dialog.open(DialogContentExampleDialog, {
      data: { content: this.modalContent }
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h1 mat-dialog-title>IMPORTANTE</h1>
    <div mat-dialog-content>
      <p>{{ data.content }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Cerrar</button>
    </div>
  `,
  styles: [`
    h1 {
      font-size: 1.5em;
      color: #0073e6;
    }
    div[mat-dialog-content] {
      font-size: 1.2em;
      color: #333;
    }
    div[mat-dialog-actions] {
      display: flex;
      justify-content: flex-end;
    }
    button[mat-button] {
      background-color: #0073e6;
      color: white;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s ease, transform 0.2s ease;
      cursor: pointer;
    }
    button[mat-button]:hover {
      background-color: #005bb5;
      transform: translateY(-2px);
    }
  `]
})
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}