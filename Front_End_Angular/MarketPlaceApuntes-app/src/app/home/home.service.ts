// home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/api';
  private apiUrl2 = 'http://localhost:3000/api/apuntes/materias'

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias`);
  }

  getSubjectNotes(subjectId: number): Observable<any> { // Nuevo método para obtener los apuntes
    return this.http.get(`${this.apiUrl2}/${subjectId}`);
  }

  deleteSubject(subjectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materias/${subjectId}`);
  }
}




