import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../dto/model/user';
import { HttpClient } from '@angular/common/http';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;
  suggestions: any[] = [];
  phoneErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {
    this.createUserForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      numeroTelephone: ['', Validators.required],
      adresse: ['', Validators.required],
      nouveauteBanque: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.createUserForm.get('numeroTelephone')?.valueChanges.subscribe(value => {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (phoneNumber && phoneNumber.isValid()) {
        this.phoneErrorMessage = '';
      } else {
        this.phoneErrorMessage = 'Numéro de téléphone invalide';
      }
    });
  }

  onAddressInput(event: any) {
    const query = event.target.value;
    if (query.length > 2) {
      this.http.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`).subscribe((data: any) => {
        this.suggestions = data.filter((item: { type: string; }) => item.type === 'city' || item.type === 'road' || item.type === 'residential');
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any) {
    this.createUserForm.patchValue({ adresse: suggestion.display_name });
    this.suggestions = [];
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      const user: User = this.createUserForm.value;
      this.userService.register(user).subscribe({
        next: (user) => {
          console.log('User created successfully', user);
          if(user.id) {
            localStorage.setItem('userId', user.id.toString());
          }
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating user', error);
        }
      });
    }
  }
}
