import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginRegisterComponent {
  
  lgForm:any={
    email:"",
    password:"",
    host:false
  }
  constructor(private LoginService: LoginService,private router:Router) {
    
  }

 
  onSubmit(): void {
    
      console.log(this.lgForm)
      
      this.LoginService.Login(this.lgForm).subscribe(
        (response) => {
          // Handle the response from the backend (if needed)
          console.log('Signup successful!', response);
          sessionStorage.setItem("token",response.token)
          sessionStorage.setItem("name",response.name)
          alert("login sucessful")
         this.router.navigate(['/home']);
        },
        (error) => {
          // Handle errors (if any)
          console.error('Error during signup:', error);
        }
      ); 
  }
}