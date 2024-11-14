import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ApunteService {
  private apiUrl = 'http://localhost:3000/api/apuntes'; 
  private apiUrl2 = 'http://localhost:3000/api/compras'

  constructor(private http: HttpClient) {}

  getApunteById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }

  
  calificarApunte(numeroAlumno: number, apunteId: number, calificacion: number): Observable<any> {
    const body = { calificacion_apunte_comprador: calificacion };
    const url = `${this.apiUrl2}/${numeroAlumno}/${apunteId}`; 
    return this.http.patch(url, body);
  }
}
