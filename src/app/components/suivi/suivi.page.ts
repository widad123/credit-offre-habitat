import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.page.html',
  styleUrls: ['./suivi.page.scss'],
})
export class SuiviPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  annuler() {
    this.router.navigate(['/home']);
    console.log('Demande annulée');
  }
}
