import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AltaAlumnoService {
  private apiUrl = 'http://localhost:3000/api/alumnos';

  constructor(private http: HttpClient) {}

  createAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, alumno);
  }
}
