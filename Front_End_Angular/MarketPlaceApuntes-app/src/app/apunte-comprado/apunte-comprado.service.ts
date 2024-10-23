import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ApunteService {
  private apiUrl = 'http://localhost:3000/api/apuntes'; 

  constructor(private http: HttpClient) {}

  getApunteById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }

  deleteApunte(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}