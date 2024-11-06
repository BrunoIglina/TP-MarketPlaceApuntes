import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModificarMateriaService {
  private apiUrl = 'http://localhost:3000/api/materias'; 

  constructor(private http: HttpClient) {}

  getMateriaById(codMateria: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${codMateria}`).pipe(
      catchError(this.handleError)
    );
  }

  updateMateria(codMateria: number, updatedMateria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${codMateria}`, updatedMateria).pipe(
      catchError(this.handleError) 
    );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud, por favor inténtalo de nuevo.'));
  }
}
