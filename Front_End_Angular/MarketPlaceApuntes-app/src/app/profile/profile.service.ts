import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/alumnos';

  constructor(private http: HttpClient) {}

  updateAlumno(numero_alumno: number, alumno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${numero_alumno}`, alumno);
  }
  
}
