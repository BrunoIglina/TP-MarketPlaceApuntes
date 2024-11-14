import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(legajo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { legajo, password });
  }

  loginAdmin(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login-admin`, { usuario, password });
  }
}
