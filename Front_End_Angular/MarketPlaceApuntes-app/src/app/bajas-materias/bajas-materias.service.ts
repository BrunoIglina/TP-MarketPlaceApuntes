import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class BajasMateriasService {
    private apiUrl = 'http://localhost:3000/api/materias';

    constructor(private http: HttpClient) {}

getMateriasBajas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bajas/totales`);
}

restoreMateria(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/restaurar`, {});
}

}