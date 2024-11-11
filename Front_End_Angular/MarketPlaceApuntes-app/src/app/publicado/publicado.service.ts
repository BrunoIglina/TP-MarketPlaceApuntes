import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  export class PublicadoService {
    private apiUrl = 'http://localhost:3000/api/apuntes/alumnos'; 
    private apiUrl2 = 'http://localhost:3000/api/apuntes'; 
    private apiUrlPrecio = 'http://localhost:3000/api/precios';
    private apiUrlCompras = 'http://localhost:3000/api/compras/apuntes/contar';

  
    constructor(private http: HttpClient) {}
  
   
    getPublicados(numeroAlumno: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${numeroAlumno}`);
    }

    createApunte(data: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl2}`, data);}
    
    createPrecio(precioData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrlPrecio}/`, precioData);
    }

    getPrecioByApunteId(apunteId: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrlPrecio}/${apunteId}`);
    }

    getComprasByApunteId(apunteId: number): Observable<number> {
      return this.http.get<{ count: number }>(`${this.apiUrlCompras}/${apunteId}`).pipe(
        map(response => response.count)
      );
    }
  }