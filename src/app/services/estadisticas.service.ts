import { Injectable } from '@angular/core';
import { ConservationStats } from '../models/especies.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
 private apiUrl = `${environment.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ConservationStats[]> {
    return this.http.get<ConservationStats[]>(this.apiUrl);
  }

  getById(id: string): Observable<ConservationStats> {
    return this.http.get<ConservationStats>(`${this.apiUrl}/${id}`);
  }

  create(ConservationStats: Partial<ConservationStats>): Observable<ConservationStats> {
    return this.http.post<ConservationStats>(this.apiUrl, ConservationStats);
  }

  update(id: string, ConservationStats: Partial<ConservationStats>): Observable<ConservationStats> {
    return this.http.put<ConservationStats>(`${this.apiUrl}/${id}`, ConservationStats);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

