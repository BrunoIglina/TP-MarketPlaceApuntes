import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompradoService {
  private apiUrl = 'http://localhost:3000/api/compras'; 
  private apiUrlPrecio = 'http://localhost:3000/api/precios';

  constructor(private http: HttpClient) {}

  getComprados(numeroAlumno: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${numeroAlumno}`);
  }

  
  calificarApunte(numeroAlumno: number, apunteId: number, calificacion: number): Observable<any> {
    const body = { calificacion_apunte_comprador: calificacion };
    const url = `${this.apiUrl}/${numeroAlumno}/${apunteId}`;
    
    
    return this.http.patch(url, body);
  }

  getPrecioByApunteId(apunteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPrecio}/${apunteId}`);
  }
}
