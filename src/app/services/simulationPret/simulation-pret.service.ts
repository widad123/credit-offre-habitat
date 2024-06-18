import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimulationPret} from "../../dto/model/simulationPret";

@Injectable({
  providedIn: 'root'
})
export class SimulationPretService {

  private apiUrl = `${environment.apiUrl}/simulationPrets`;
  constructor(private http: HttpClient) { }

  getAllSimulationPrets(): Observable<SimulationPret[]> {
    return this.http.get<SimulationPret[]>(this.apiUrl);
  }

  getSimulationPret(id: number): Observable<SimulationPret> {
    return this.http.get<SimulationPret>(`${this.apiUrl}/${id}`);
  }

  createSimulationPret(simulationPret: SimulationPret): Observable<number> {
    return this.http.post<number>(this.apiUrl, simulationPret, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateSimulationPret(id: number, simulationPret: SimulationPret): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, simulationPret, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteSimulationPret(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
