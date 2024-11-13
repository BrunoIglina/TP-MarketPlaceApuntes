import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AltaAdminService {
  private apiUrl = 'http://localhost:3000/api/administrador';

  constructor(private http: HttpClient) {}

  createAdmin(admin: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, admin);
  }
}
