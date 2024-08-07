<<<<<<< HEAD
// app.component.ts
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
=======
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
>>>>>>> 75c6c6a303f57c16c203a04bcdcf9a78bbbcc6fb

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule ,RouterOutlet, HeaderComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
=======
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
>>>>>>> 75c6c6a303f57c16c203a04bcdcf9a78bbbcc6fb
})
export class AppComponent {
  title = 'MarketPlaceApuntes-app';
}
