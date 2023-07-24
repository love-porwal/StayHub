import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.css']
})
export class TcComponent {

  formData: any = {
    name: '',
    email: '',
    mobile: 0,
    password: '',
    host:false,
  };
  constructor(private RegisterService: RegisterService) {}
  onSubmit(){
    console.log(this.formData)
    
    this.RegisterService.signup(this.formData).subscribe(
      (response) => {
        // Handle the response from the backend (if needed)
        console.log('Signup successful!', response);
      },
      (error) => {
        // Handle errors (if any)
        console.error('Error during signup:', error);
      }
    );
  }
 
} 