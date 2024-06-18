import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {}
  onSegmentChanged(event: any) {
    const value = event.detail.value;
    if (value) {
      this.router.navigate([`/${value}`]);
    }
  }
}
