import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DetailSimulation} from "../../dto/model/detailSimulation";

@Injectable({
  providedIn: 'root'
})
export class DetailSimulationService {

  private apiUrl = `${environment.apiUrl}/detailSimulations`;

  constructor(private http: HttpClient) { }

  getAllDetailSimulations(): Observable<DetailSimulation[]> {
    return this.http.get<DetailSimulation[]>(this.apiUrl);
  }

  getDetailSimulation(id: number): Observable<DetailSimulation> {
    return this.http.get<DetailSimulation>(`${this.apiUrl}/${id}`);
  }

  createDetailSimulation(detailSimulation: DetailSimulation): Observable<number> {
    return this.http.post<number>(this.apiUrl, detailSimulation, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateDetailSimulation(id: number, detailSimulation: DetailSimulation): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, detailSimulation, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteDetailSimulation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
