import { Component, OnInit } from '@angular/core';
import {FavorisService} from "../../services/favoris/favoris.service";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  favoris: any[] = [];
  userId: number = Number(localStorage.getItem('userId'));

  constructor(private favorisService: FavorisService) { }

  ngOnInit() {
    this.loadFavoris();
  }

  loadFavoris() {
    this.favorisService.getFavoris(this.userId).subscribe((data) => {
      this.favoris = data;
    });
  }
}
