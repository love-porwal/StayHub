import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginRegisterComponent {
  isRegistering: boolean = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  toggleRegister(): void {
    this.isRegistering = !this.isRegistering;
    console.log(this.isRegistering)
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // Assuming your backend API endpoint for login is '/api/login'
      this.http.post('/api/login', formData).subscribe(
        (response) => {
          // Handle successful response from the backend
          console.log('Login success!', response);
          // Optionally, you can redirect the user to another page after successful login
        },
        (error) => {
          // Handle error from the backend
          console.error('Login failed!', error);
        }
      );
    }
  }
}