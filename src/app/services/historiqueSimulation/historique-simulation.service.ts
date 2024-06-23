import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueSimulationService {
  private apiUrl = `${environment.apiBaseUrl}/api/historique`;

  constructor(private http: HttpClient) { }

  getHistoriqueSimulationsByUser(userId: number): Observable<HistoriqueSimulation[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<HistoriqueSimulation[]>(url);
  }

  toggleFavoris(userId: number, offreId: number): Observable<void> {
    const url = `${this.apiUrl}/toggle-favoris/${userId}/${offreId}`;
    return this.http.post<void>(url, {});
  }
}

export interface HistoriqueSimulation {
  id: number;
  offreId: number;
  userId: number;
  // autres propriétés...
}

