import { Injectable } from '@angular/core';
import { EcosystemInfo } from '../models/especies.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EcosistemaService {
 private apiUrl = `${environment.apiUrl}/ecosystems`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EcosystemInfo[]> {
    return this.http.get<EcosystemInfo[]>(this.apiUrl);
  }

  getById(id: string): Observable<EcosystemInfo> {
    return this.http.get<EcosystemInfo>(`${this.apiUrl}/${id}`);
  }

  create(EcosystemInfo: Partial<EcosystemInfo>): Observable<EcosystemInfo> {
    return this.http.post<EcosystemInfo>(this.apiUrl, EcosystemInfo);
  }

  update(id: string, EcosystemInfo: Partial<EcosystemInfo>): Observable<EcosystemInfo> {
    return this.http.put<EcosystemInfo>(`${this.apiUrl}/${id}`, EcosystemInfo);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

