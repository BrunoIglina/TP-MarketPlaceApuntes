import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-apunte-comprado',
  templateUrl: './apunte-comprado.component.html',
  styleUrls: ['./apunte-comprado.component.css'],
  imports: [CommonModule]
})
export class ApunteCompradoComponent implements OnInit {
  itemId: string | null = null;
  item: { imagenUrl: string, titulo: string, descripcion: string } | null = null;

  // Mock data, replace with actual data fetching logic
  items = [
    { id: '0', imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Primer adquirido', descripcion: 'Descripción del primer apunte.' },
    { id: '1', imagenUrl: 'assets/apunteGenerico.jpg', titulo: 'Producto 2', descripcion: 'Descripción del segundo apunte.' },
    // Add more items here
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.item = this.items.find(i => i.id === this.itemId) || null;
  }

  goBack(): void {
    this.router.navigate(['/comprado']);  // Navegar a la página de "comprado"
  }
}

