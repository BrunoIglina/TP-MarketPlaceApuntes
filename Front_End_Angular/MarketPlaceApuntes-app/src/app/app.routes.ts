import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompradoComponent } from './comprado/comprado.component';
import { PublicadoComponent } from './publicado/publicado.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'comprado', component: CompradoComponent },
  { path: 'publicado', component: PublicadoComponent },
];

