import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  activeSegment: string = 'home';

  constructor(private router: Router) {
  }

  onSegmentChanged(event: any) {
    this.activeSegment = event.detail.value;
    this.router.navigate([`/${this.activeSegment}`]);
  }
}
