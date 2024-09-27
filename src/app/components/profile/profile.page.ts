import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../dto/model/user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  simulationPanelOpen = false;

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
      adresse: ['', Validators.required],
      duree: ['', Validators.required],
      apport: ['', Validators.required],
      mensualite: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (user: User) => {
          this.user = user;
          this.profileForm.patchValue(user);
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        }
      });
    } else {
      console.error('No valid user ID found in local storage.');
      this.router.navigate(['/login']); // Redirect to login if no user ID is found
    }
  }

  toggleSimulationPanel() {
    this.simulationPanelOpen = !this.simulationPanelOpen;
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

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  goToHistorique() {
    this.router.navigate(['/historique-simulation']);
  }
}
