<<<<<<< HEAD
// appconfig.ts
import { provideHttpClient, withFetch, withInterceptors, } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideHttpClient( withFetch(),),],
=======
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
>>>>>>> 75c6c6a303f57c16c203a04bcdcf9a78bbbcc6fb
};
