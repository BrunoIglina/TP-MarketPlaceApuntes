import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModificarMateriaService {
  private apiUrl = 'http://localhost:3000/api/materias'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener una materia por su código (ahora como número)
  getMateriaById(codMateria: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${codMateria}`).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Actualizar los datos de una materia específica
  updateMateria(codMateria: number, updatedMateria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${codMateria}`, updatedMateria).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud, por favor inténtalo de nuevo.'));
  }
}


