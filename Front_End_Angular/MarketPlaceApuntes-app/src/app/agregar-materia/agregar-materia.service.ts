import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgregarMateriaService {
    private apiUrl = 'http://localhost:3000/api/materias';

    constructor(private http: HttpClient) {}

    createMateria(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, data).pipe(
        catchError(this.handleError)
    );
    }

    private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud, por favor inténtalo de nuevo.'));
    }
}
