import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class PublicadoService {
    private apiUrl = 'http://localhost:3000/api/apuntes/alumnos'; 
  
    constructor(private http: HttpClient) {}
  
   
    getPublicados(numeroAlumno: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${numeroAlumno}`);
    }
  }