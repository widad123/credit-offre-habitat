import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../dto/model/user";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroTelephone: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(Number(userId)).subscribe({
        next: (user: User) => {
          this.user = user;
          this.profileForm.patchValue(user);
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        }
      });
    } else {
      console.error('No user ID found in local storage.');
      this.router.navigate(['/login']); // Redirect to login if no user ID is found
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.user) {
      const updatedUser: User = this.profileForm.value;
      this.userService.updateUser(this.user.id!, updatedUser).subscribe({
        next: response => {
          console.log('User updated successfully', response);
        },
        error: error => {
          console.error('Error updating user', error);
        }
      });
    }
  }
}
