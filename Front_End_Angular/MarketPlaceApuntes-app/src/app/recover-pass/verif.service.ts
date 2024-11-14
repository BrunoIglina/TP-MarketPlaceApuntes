import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifService {
  private apiUrl = 'http://localhost:3000/api/verif';

  constructor(private http: HttpClient) {}

  sendVerificationCode(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-verification-code`, { email });
  }

  verifyCodeAndChangePassword(email: string, verificationCode: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-code-and-change-password`, { email, verificationCode, newPassword });
  }
}