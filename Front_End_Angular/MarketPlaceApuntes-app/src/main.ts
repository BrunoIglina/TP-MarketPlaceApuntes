import { bootstrapApplication } from '@angular/platform-browser';
<<<<<<< HEAD
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ],
}).catch((err) => console.error(err));



  

 
=======
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component'; 

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  bootstrapApplication(HeaderComponent);
>>>>>>> 75c6c6a303f57c16c203a04bcdcf9a78bbbcc6fb
