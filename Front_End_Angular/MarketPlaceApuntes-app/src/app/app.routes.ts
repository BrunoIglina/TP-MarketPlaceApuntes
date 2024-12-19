import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompradoComponent } from './comprado/comprado.component';
import { PublicadoComponent } from './publicado/publicado.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { FooterComponent } from './footer/footer.component';
import { EnterTokenComponent } from './enter-token/enter-token.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NgModule } from '@angular/core';
import { ApunteCompradoComponent } from './apunte-comprado/apunte-comprado.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ModificarMateriaComponent } from './modificar-materia/modificar-materia.component';
import { AgregarMateriaComponent } from './agregar-materia/agregar-materia.component';
import { CargarApunteComponent } from './cargar-apunte/cargar-apunte.component';
import { EdicionApunteComponent } from './edicion-apunte/edicion-apunte.component';
import { CompraApunteComponent } from './compra-apunte/compra-apunte.component';
import { AppSucessComponent } from './app-sucess/app-sucess.component';
import { MercadoPagoComponent } from './mercado-pago/mercado-pago.component';
import { AltaAlumnoComponent } from './alta-alumno/alta-alumno.component';
import { AuthGuard } from './auth.guard';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { AltaAdminComponent } from './alta-admin/alta-admin.component';
import { BajasApuntesComponent } from './bajas-apuntes/bajas-apuntes.component';
import { BajasMateriasComponent } from './bajas-materias/bajas-materias.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'comprado', component: CompradoComponent, canActivate: [AuthGuard] },
  { path: 'comprado/:id', component: CompradoComponent, canActivate: [AuthGuard] },
  { path: 'publicado', component: PublicadoComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'recover-pass', component: RecoverPassComponent },
  { path: 'enter-token', component: EnterTokenComponent },
  { path: 'footer', component: FooterComponent, canActivate: [AuthGuard] },
  { path: 'note-detail', component: NoteDetailComponent, canActivate: [AuthGuard] },
  { path: 'note-detail/:id', component: NoteDetailComponent, canActivate: [AuthGuard] },
  { path: 'apunte-comprado/:id', component: ApunteCompradoComponent, canActivate: [AuthGuard] },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard]},
  { path: 'modificar-materia/:id', component: ModificarMateriaComponent, canActivate: [AuthGuard] },
  { path: 'agregar-materia', component: AgregarMateriaComponent, canActivate: [AuthGuard] },
  { path: 'cargar-apunte', component: CargarApunteComponent, canActivate: [AuthGuard]},
  {path: 'edicionApunte/:id', component: EdicionApunteComponent, canActivate: [AuthGuard]},
  {path: 'compra-apunte/:id', component: CompraApunteComponent, canActivate: [AuthGuard]},
  { path: 'success', component: AppSucessComponent, canActivate: [AuthGuard] },
  { path: 'mercado-pago', component: MercadoPagoComponent, canActivate: [AuthGuard]},
  { path: 'alta-alumno', component: AltaAlumnoComponent},
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'profile-admin', component: ProfileAdminComponent },
  { path: 'alta-admin', component: AltaAdminComponent},
  { path: 'bajas-apuntes', component: BajasApuntesComponent, canActivate: [AuthGuard] },
  { path: 'bajas-materias', component: BajasMateriasComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

