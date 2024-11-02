/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../home/homeService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra-apunte',
  templateUrl: './compra-apunte.component.html',
  styleUrls: ['./compra-apunte.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CompraApunteComponent implements OnInit {
  apunte: any;

  constructor(
    private route: ActivatedRoute,
    private apunteService: NoteService
  ) {}

  ngOnInit() {
    const apunteId = this.route.snapshot.paramMap.get('id');
    this.apunteService.getApunteById(apunteId).subscribe((data) => {
      this.apunte = data;
    });
  }

  onComprar() {
    
    console.log('Compra iniciada');
  }
}
*/