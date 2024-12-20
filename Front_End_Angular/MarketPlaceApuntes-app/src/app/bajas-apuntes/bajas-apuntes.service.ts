import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class BajasApuntesService {
    private apiUrl = 'http://localhost:3000/api/apuntes';

    constructor(private http: HttpClient) {}

getApuntesBajas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bajas/totales`);
}

restoreApunte(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/restore/${id}`, {});
}

}