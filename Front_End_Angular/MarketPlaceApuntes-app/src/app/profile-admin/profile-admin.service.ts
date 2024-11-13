import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdminService {
  private apiUrl = 'http://localhost:3000/api/administrador';

  constructor(private http: HttpClient) {}

  updateAdmin(numero_usuario: number, admin: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${numero_usuario}`, admin);
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, admin);
  }

  getAdmin(numero_usuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${numero_usuario}`);
  }
}
