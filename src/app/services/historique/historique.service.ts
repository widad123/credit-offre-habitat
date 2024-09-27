import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriqueSimulation } from '../../dto/model/historiqueSimulation';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private apiUrl = `${environment.apiUrl}/historique`;

  constructor(private http: HttpClient, private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  toggleHistorique(userId: number, offreId: number): Observable<void> {
    console.log("user "+userId,"offre "+offreId);
    return this.http.post<void>(`${this.apiUrl}/toggle-historique/${userId}/${offreId}`, {}, { headers: this.getHeaders() });
  }

  getHistoriqueSimulationsByUser(userId: number): Observable<HistoriqueSimulation[]> {
    return this.http.get<HistoriqueSimulation[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
  }
}
