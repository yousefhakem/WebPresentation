import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  isLoginMode = true;
  email = '';
  password = '';
  name = '';
  error = '';
  returnTo = '/';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.returnTo = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  submit(): void {
    const url = this.isLoginMode
      ? 'http://localhost:3000/api/auth/login'
      : 'http://localhost:3000/api/auth/register';

    const payload = this.isLoginMode
      ? { email: this.email, password: this.password }
      : { name: this.name, email: this.email, password: this.password };

    this.http.post<any>(url, payload).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.login(response.token);
          this.router.navigate(['/home']);
        } else {
          console.log("Successful Registration, now login");
        }
      },
      error: (err) => {
        console.error('Error al autenticar:', err);
      }
    });
  }
}
