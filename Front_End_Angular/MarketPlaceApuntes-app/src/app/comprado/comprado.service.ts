import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompradoService {
  private apiUrl = 'http://localhost:3000/api/compras'; 
  private apiUrlPrecio = 'http://localhost:3000/api/precios';

  constructor(private http: HttpClient) {}

  getComprados(numeroAlumno: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${numeroAlumno}`).pipe(
      catchError(this.handleError)
    );
  }

  calificarApunte(numeroAlumno: number, apunteId: number, calificacion: number): Observable<any> {
    const body = { calificacion_apunte_comprador: calificacion };
    const url = `${this.apiUrl}/${numeroAlumno}/${apunteId}`;
    return this.http.patch(url, body).pipe(
      catchError(this.handleError)
    );
  }
  

  getPrecioByApunteId(apunteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPrecio}/${apunteId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud, por favor inténtalo de nuevo.'));
  }
}
