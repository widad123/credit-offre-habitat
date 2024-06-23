import {Component, NgIterable, OnInit} from '@angular/core';
import {HistoriqueSimulationService} from "../../services/historiqueSimulation/historique-simulation.service";
import {HistoriqueSimulation} from "../../dto/model/historiqueSimulation";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  historiqueSimulations: any[] = [];
  filteredSimulations: any[] = [];
  userId: number = Number(localStorage.getItem('userId'));

  constructor(private historiqueSimulationService: HistoriqueSimulationService) { }

  ngOnInit() {
    this.loadHistorique();
  }

  loadHistorique() {
    this.historiqueSimulationService.getHistoriqueSimulationsByUser(this.userId).subscribe((data) => {
      this.historiqueSimulations = data;
      this.filteredSimulations = data;
    });
  }

  toggleFavoris(offreId: number) {
    this.historiqueSimulationService.toggleFavoris(this.userId, offreId).subscribe(() => {
      // Optionally, update the UI or notify the user
    });
  }

  filterType(type: string) {
    this.filteredSimulations = this.historiqueSimulations.filter(simulation => simulation.offreImmobilier.typeBien === type);
  }

  getCountByType(type: string): number {
    return this.historiqueSimulations.filter(simulation => simulation.offreImmobilier.typeBien === type).length;
  }

  getFirstImage(images: any[]): string {
    return images.length > 0 ? images[0].url : 'default-image-url';
  }
}
