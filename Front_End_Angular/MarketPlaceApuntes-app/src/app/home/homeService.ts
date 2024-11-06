import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class NoteService {
  private baseUrl: string = 'http://localhost:3000/api/apuntes/materias'; 
  private baseUrl2: string = 'http://localhost:3000/api/apuntes';

  constructor(private http: HttpClient) {}

  
  getNotesBySubjectId(subjectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${subjectId}`);
  }
  obtenerApuntePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl2}/${id}`);
  }

  
}
