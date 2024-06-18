import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {OffreImmobilier} from "../../dto/model/offreImmobilier";
import {OffreImmobilierResponse} from "../../dto/model/offreImmobilierResponse";

@Injectable({
  providedIn: 'root'
})
export class OffreImmobilierService {

  private apiUrl = `${environment.apiUrl}/offreImmobiliers`;  // URL de l'API

  constructor(private http: HttpClient) { }

  getAllOffreImmobiliers(): Observable<OffreImmobilier[]> {
    return this.http.get<OffreImmobilier[]>(this.apiUrl);
  }

  getOffreImmobilier(id: number): Observable<OffreImmobilierResponse> {
    return this.http.get<OffreImmobilierResponse>(`${this.apiUrl}/${id}`);
  }

  createOffreImmobilier(offreImmobilier: OffreImmobilier): Observable<number> {
    return this.http.post<number>(this.apiUrl, offreImmobilier, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateOffreImmobilier(id: number, offreImmobilier: OffreImmobilier): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, offreImmobilier, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteOffreImmobilier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filterOffreImmobilier(typeBien?: string, adresse?: string, prix?: string, description?: string): Observable<OffreImmobilier[]> {
    let params = new HttpParams();
    if (typeBien) params = params.append('typeBien', typeBien);
    if (adresse) params = params.append('adresse', adresse);
    if (prix) params = params.append('prix', prix);
    if (description) params = params.append('description', description);

    return this.http.get<OffreImmobilier[]>(`${this.apiUrl}/filter`, { params });
  }
}
