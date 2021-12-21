import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  registrationDetails:any[]= [];
  title = 'userLogin';

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    if(typeof(Storage) !== 'undefined' && (localStorage.getItem('RegistrationDetails'))) {
      this.registrationDetails = (JSON.parse(localStorage.getItem('RegistrationDetails') || '{}'));
      console.log(this.registrationDetails);
      console.log(this.registrationDetails[0].userName);
    }
  }

  onLogin() {

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(email);
    console.log(password);

    if((this.registrationDetails[0].email === email) && (this.registrationDetails[0].password === password)) {
      console.log('equal');
      this.router.navigateByUrl('app-user-details');
    }
    else{
      console.log('not-equal');
    }
  }

}
