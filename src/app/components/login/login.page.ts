import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../dto/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  passwordType: string = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, motDePasse} = this.loginForm.value;
      console.log('Submitted email:', email);
      console.log('Submitted password:', motDePasse);

      this.userService.getAllUsers().subscribe({
        next: (users: User[]) => {
          console.log('Received users:', users);
          const user = users.find(u => u.email === email && u.motDePasse === motDePasse);
          if (user) {
            console.log('User logged in:', user);
            if (user.id) {  // Check if user.id is defined
              localStorage.setItem('userId', user.id.toString());
              this.router.navigate(['/home']);
            } else {
              console.error('User ID is undefined');
            }
          } else {
            console.error('Login failed: invalid credentials');
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
    navigateToCreateUser() {
      this.router.navigate(['/createUser']);
    }
}
