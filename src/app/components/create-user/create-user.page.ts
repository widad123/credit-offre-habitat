import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {User} from "../../dto/model/user";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
  }
  onSubmit() {
    if (this.createUserForm.valid) {
      const user: User = this.createUserForm.value;
      if (!user.nouveauteBanque) {
        user.nouveauteBanque = [];  // Initialisez le tableau s'il est vide
      }
      this.userService.createUser(user).subscribe({
        next: (userId => {
        console.log('User created successfully', userId);
          if (userId) {  // Check if user.id is defined
            localStorage.setItem('userId', userId.toString());
            this.router.navigate(['/home']); // Redirect to the home page after creation
          } else {
            console.error('User ID is undefined');
          }
        this.router.navigate(['/home']); // Redirigez vers une page appropriée après la création
      }),
        error: error => {
        console.error('Error creating user', error);
      }});
    }
  }
}
