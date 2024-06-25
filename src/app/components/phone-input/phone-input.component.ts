import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements AfterViewInit {
  @ViewChild('phoneInput', { static: true }) phoneInput!: ElementRef;

  ngAfterViewInit() {
    const input = this.phoneInput.nativeElement;
    intlTelInput(input, {
      initialCountry: 'auto',
      geoIpLookup: (success, failure) => {
        fetch('https://ipinfo.io/json', { method: 'GET' })
          .then(response => response.json())
          .then((json) => {
            const countryCode = json && json.country ? json.country : 'us';
            success(countryCode);
          })
          .catch(failure);
      },
      utilsScript: 'assets/intl-tel-input/js/utils.js'
    });
  }
}
