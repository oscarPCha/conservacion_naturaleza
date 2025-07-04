import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Species } from '../models/especies.model';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {
 private apiUrl = `${environment.apiUrl}/species`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  getById(id: string): Observable<Species> {
    return this.http.get<Species>(`${this.apiUrl}/${id}`);
  }

  create(species: Partial<Species>): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }

  update(id: string, species: Partial<Species>): Observable<Species> {
    return this.http.put<Species>(`${this.apiUrl}/${id}`, species);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
