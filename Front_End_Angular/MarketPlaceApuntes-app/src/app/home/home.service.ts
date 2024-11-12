import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/api';
  private apiUrl2 = 'http://localhost:3000/api/apuntes/materias';
  private apiUrl3 = 'http://localhost:3000/api/apuntes';
  private apiUrlPrecio = 'http://localhost:3000/api/precios';
  private baseUrl: string = 'http://localhost:3000/api/apuntes/materias'; 

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias`);
  }

  getSubjectNotes(subjectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/${subjectId}`);
  }

  deleteSubject(subjectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materias/${subjectId}`);
  }

  obtenerApuntePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/${id}`);
  }

  getPrecioByApunteId(apunteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPrecio}/${apunteId}`);
  }

  getNotesBySubjectId(subjectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${subjectId}`);
  }

  getAllNotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl3}`);
  }
}
