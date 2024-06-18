import { Component, OnInit } from '@angular/core';
import {OffreImmobilierResponse} from "../../dto/model/offreImmobilierResponse";
import {ActivatedRoute} from "@angular/router";
import {OffreImmobilierService} from "../../services/offreImmobilier/offre-immobilier.service";
import {OverpassService} from "../../services/overpass/overpass.service";
import {GeolocationService} from "../../services/geolocation/geolocation.service";
import {OffreImmobilier} from "../../dto/model/offreImmobilier";
import {NavController, ToastController} from "@ionic/angular";
import SwiperCore from "swiper";
import {register} from "swiper/element/bundle";
import {Navigation, Pagination} from "swiper/modules";
import {FavorisService} from "../../services/favoris/favoris.service";


SwiperCore.use([Pagination, Navigation]);


register();
@Component({
  selector: 'app-offre-detail-component',
  templateUrl: './offre-detail-component.page.html',
  styleUrls: ['./offre-detail-component.page.scss'],
})
export class OffreDetailComponentPage implements OnInit {
  offreResponse: OffreImmobilierResponse | undefined;
  lieuxProches: any[] = [];
  isFavori: boolean = false;
  userId!: number;
  constructor(
    private route: ActivatedRoute,
    private offreImmobilierService: OffreImmobilierService,
    private overpassService: OverpassService,
    private geolocationService: GeolocationService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private favorisService: FavorisService
  ) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.offreImmobilierService.getOffreImmobilier(id).subscribe((data) => {
      this.offreResponse = data;
      this.checkFavoriStatus();
      this.loadNearbyPlaces();
    });
  }

  async loadNearbyPlaces() {
    const coords = await this.geolocationService.getCurrentPosition();
    this.overpassService.getNearbyPlaces(coords.lat, coords.lng, 'shop|amenity').subscribe((response) => {
      this.lieuxProches = response.elements
        .filter((element: { tags: { shop: string; amenity: string; }; }) => ['supermarket', 'pharmacy', 'hospital', 'convenience'].includes(element.tags.shop) || ['pharmacy', 'hospital'].includes(element.tags.amenity))
        .map((element: { tags: { name: any; }; lat: number; lon: number; }) => ({
          nom: element.tags.name,
          distance: this.calculateDistance(coords.lat, coords.lng, element.lat, element.lon),
          type: this.getPlaceType(element.tags),
          icon: this.getPlaceIcon(element.tags)
        }))
        .slice(0, 2);
    });
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return `${(d * 1000).toFixed(0)} m`; // Convert to meters and format
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  getPlaceType(tags: any): string {
    if (tags.shop) {
      if (tags.shop === 'convenience' || tags.shop === 'supermarket') return 'supermarket';
    }
    if (tags.amenity) {
      if (tags.amenity === 'pharmacy') return 'pharmacy';
      if (tags.amenity === 'hospital') return 'hospital';
    }
    return 'unknown';
  }

  getPlaceIcon(tags: any): string {
    if (tags.shop) {
      if (tags.shop === 'convenience' || tags.shop === 'supermarket') return 'cart-outline';
    }
    if (tags.amenity) {
      if (tags.amenity === 'pharmacy') return 'medkit-outline';
      if (tags.amenity === 'hospital') return 'medkit-outline';
    }
    return 'help-outline';
  }

  toggleFavori() {
    const offreId = this.offreResponse?.offreImmobilier?.id;
    if (!offreId || !this.userId) return;

    this.favorisService.toggleFavoris(this.userId, offreId).subscribe(() => {
      this.isFavori = !this.isFavori;
    });
  }

  checkFavoriStatus() {
    const offreId = this.offreResponse?.offreImmobilier?.id;
    if (!offreId || !this.userId) return;

    this.favorisService.isFavori(this.userId, offreId).subscribe({
      next: (isFavori) => {
        this.isFavori = isFavori;
      },
      error: (err) => {
        console.error('Error checking favori status:', err);
        this.showErrorMessage('Erreur lors de la vérification du statut favori');
      }
    });
  }

  showErrorMessage(message: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
  partagerOffre() {
    const shareData = {
      title: 'Offre Immobilier',
      text: `Découvrez cette offre immobilière à ${this.offreResponse?.offreImmobilier?.adresse}`,
      url: window.location.href
    }
    navigator.share(shareData).then(() => {
      this.showToast('Offre partagée avec succès');
    }).catch((error) => {
      console.error('Error sharing', error);
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  getChambresText(chambres: OffreImmobilier.ChambresEnum | undefined): string {
    switch (chambres) {
      case 'S1': return '1 Chambre';
      case 'S2': return '2 Chambres';
      case 'S3': return '3 Chambres';
      case 'S4': return '4 Chambres';
      case 'S5': return '5 Chambres';
      case 'S6': return '6 Chambres';
      default: return 'Chambres';
    }
  }

  getSallesDeBainText(sallesDeBain: OffreImmobilier.SallesDeBainEnum | undefined): string {
    switch (sallesDeBain) {
      case 'B1': return '1 Salle de bain';
      case 'B2': return '2 Salles de bain';
      case 'B3': return '3 Salles de bain';
      case 'B4': return '4 Salles de bain';
      case 'B5': return '5 Salles de bain';
      case 'B6': return '6 Salles de bain';
      default: return 'Salles de bain';
    }
  }

  getTypeBienText(typeBien: OffreImmobilier.TypeBienEnum | undefined): string {
    switch (typeBien) {
      case 'MAISON': return 'Maison';
      case 'APARTMENT': return 'Appartement';
      case 'VILLA': return 'Villa';
      case 'LOFT': return 'Loft';
      default: return 'Type de bien';
    }
  }

  getStatutProprieteText(statutPropriete: OffreImmobilier.StatutProprieteEnum | undefined): string {
    switch (statutPropriete) {
      case 'DISPONIBLE': return 'Disponible';
      case 'NON_DISPONIBLE': return 'Non Disponible';
      case 'RESERVE': return 'Réservé';
      default: return 'Statut de la propriété';
    }
  }

  getAmeublementText(ameublement: OffreImmobilier.AmeublementEnum | undefined): string {
    switch (ameublement) {
      case 'SEMI_EQUIPE': return 'Semi équipé';
      case 'NON_EQUIPE': return 'Non équipé';
      case 'EQUIPE': return 'Équipé';
      default: return 'Ameublement';
    }
  }

  afficherSurLaCarte(adresse: string | undefined) {
    if (adresse) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;
      window.open(url, '_blank');
    } else {
      console.error('Adresse non définie');
    }
  }

}
