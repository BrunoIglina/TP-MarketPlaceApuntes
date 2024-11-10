import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('authToken');
    });
  }
}
