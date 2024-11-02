import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompradoComponent } from './comprado/comprado.component';
import { PublicadoComponent } from './publicado/publicado.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { FooterComponent } from './footer/footer.component';
import { EnterTokenComponent } from './enter-token/enter-token.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApunteCompradoComponent } from './apunte-comprado/apunte-comprado.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CargarApunteComponent } from './cargar-apunte/cargar-apunte.component';
import { EdicionApunteComponent } from './edicion-apunte/edicion-apunte.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'comprado', component: CompradoComponent },
  { path: 'comprado/:id', component: CompradoComponent },
  { path: 'publicado', component: PublicadoComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recover-pass', component: RecoverPassComponent },
  { path: 'enter-token', component: EnterTokenComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'note-detail', component: NoteDetailComponent },
  { path: 'note-detail/:id', component: NoteDetailComponent },
  { path: 'apunte-comprado/:id', component: ApunteCompradoComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent},
  { path: 'cargar-apunte', component: CargarApunteComponent},
  {path: 'edicionApunte/:id', component: EdicionApunteComponent},
  //{ path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

