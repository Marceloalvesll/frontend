import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telefone } from '../models/telefone.model';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {
  private baseUrl = 'http://localhost:8080/telefone';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Telefone[]> {
    return this.httpClient.get<Telefone[]>(this.baseUrl);
  }

  findById(idTelefone: string): Observable<Telefone> {
    return this.httpClient.get<Telefone>(`${this.baseUrl}/${idTelefone}`);
  }

  insertTelefone(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.post<Telefone>(this.baseUrl, telefone);
  }

  updateTelefone(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.put<Telefone>(`${this.baseUrl}/${telefone.id}`, telefone);
  }

  delete(telefone: Telefone): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${telefone.id}`);
  }

}