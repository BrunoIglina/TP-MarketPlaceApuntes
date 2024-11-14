import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SessionService } from './app/session.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideAnimationsAsync(), provideAnimationsAsync(),
    SessionService, provideAnimationsAsync()
  ],
}).catch((err) => console.error(err));
