import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule,FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SlotdetailsComponent } from './slot-booking/slot-booking.component';
import {HttpClientModule} from "@angular/common/http";
import { TcComponent } from './tc/tc.component';
import { LoginRegisterComponent } from './login-signup/login-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlotdetailsComponent,
    TcComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }