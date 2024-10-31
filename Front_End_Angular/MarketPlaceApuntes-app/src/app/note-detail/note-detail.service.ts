import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteDetailService {
  private apiUrl = 'http://localhost:3000/api/apuntes'; 
  private apiUrlPrecio = 'http://localhost:3000/api/precios';
  

  constructor(private http: HttpClient) {}

  getApunteById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }

  deleteApunte(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  downloadApunte(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/descargar/${id}`, { responseType: 'blob' });
  }
  createPrecio(precioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlPrecio}/`, precioData);
  }
  getPrecioByApunteId(apunteId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPrecio}/${apunteId}`);
  }
  
}
