import { Component, OnInit } from '@angular/core';
import { OffreImmobilierService } from "../../services/offreImmobilier/offre-immobilier.service";
import { OffreImmobilier } from "../../dto/model/offreImmobilier";
import { Router } from "@angular/router";
import { register } from 'swiper/element/bundle';
import { FavorisService } from "../../services/favoris/favoris.service";
import { ToastController } from "@ionic/angular";

register();

export interface OffreImmobilierExtended extends OffreImmobilier {
  isFavori?: boolean;
}

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit {
  recommandations: OffreImmobilierExtended[] = [];
  presDeChezVous: OffreImmobilierExtended[] = [];
  userId: number;

  constructor(
    private offreImmobilierService: OffreImmobilierService,
    private router: Router,
    private favorisService: FavorisService,
    private toastController: ToastController
  ) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadRecommandations();
  }

  loadRecommandations() {
    this.offreImmobilierService.getAllOffreImmobiliers().subscribe((data: OffreImmobilier[]) => {
      this.recommandations = data.map(offre => ({ ...offre, isFavori: false }));
      this.presDeChezVous = data
        .filter(offre => offre.adresse.includes('Paris'))
        .map(offre => ({ ...offre, isFavori: false }));
      this.checkFavoriStatus();
    });
  }

  viewDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/offre-detail-component', id]);
    } else {
      console.error('Invalid information ID:', id);
    }
  }

  checkFavoriStatus() {
    if (this.userId) {
      this.recommandations.forEach(offre => {
        this.favorisService.isFavori(this.userId, offre.id).subscribe({
          next: (isFavori) => {
            offre.isFavori = isFavori;
          },
          error: (err) => {
            console.error('Error checking favori status:', err);
            this.showErrorMessage('Erreur lors de la vérification du statut favori');
          }
        });
      });
      this.presDeChezVous.forEach(offre => {
        this.favorisService.isFavori(this.userId, offre.id).subscribe({
          next: (isFavori) => {
            offre.isFavori = isFavori;
          },
          error: (err) => {
            console.error('Error checking favori status:', err);
            this.showErrorMessage('Erreur lors de la vérification du statut favori');
          }
        });
      });
    }
  }

  showErrorMessage(message: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }

  formatTypeBien(typeBien: string | undefined): string {
    if (!typeBien) {
      return '';
    }
    switch (typeBien) {
      case 'APPARTEMENT':
        return 'Appartement';
      case 'MAISON':
        return 'Maison';
      case 'VILLA':
        return 'Villa';
      case 'LOFT':
        return 'Loft';
      default:
        return typeBien;
    }
  }
}
