  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class CompraService {
    private apiUrl = 'http://localhost:3000/api/compras'; 
    private apiUrl2 = 'http://localhost:3000/api/mercadopago';
    private apiUrl3 = 'http://localhost:3000/api/apuntes';

    constructor(private http: HttpClient) {}

    crearPreferencia(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl2}/create_preference`, data);
    }

    crearCompra(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, data);
    }
    verificarCompra(numeroAlumno: number, apunteId: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${numeroAlumno}/${apunteId}`);
    }

    deleteApunte(id: number, numeroAdmin: number): Observable<any> {
      return this.http.delete(`${this.apiUrl3}/${id}/${numeroAdmin}`);
    }
  }
