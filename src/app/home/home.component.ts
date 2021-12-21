import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registrationDetails:any[] = [];
  openLoginPage = false;
  openRegistrationPage = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(typeof(Storage) !== 'undefined' && (localStorage.getItem('RegistrationDetails'))) {
      this.registrationDetails = (JSON.parse(localStorage.getItem('RegistrationDetails') || '{}'));
      console.log(this.registrationDetails);
      console.log(this.registrationDetails.length);
      if(this.registrationDetails.length >0 ) {
        this.openLoginPage = true;
        this.openRegistrationPage = false;
      }
    }
  }

  onRegister() {
    this.router.navigateByUrl('app-registration-page');
  }

  onLogin() {
    this.router.navigateByUrl('app-login-page');
  }

}
