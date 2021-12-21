import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;
  passwordIncorrect = false;
  registrationDetails: any[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(typeof(Storage) !== 'undefined' && (localStorage.getItem('RegistrationDetails'))) {
      this.registrationDetails = (JSON.parse(localStorage.getItem('RegistrationDetails') || '{}'));

      this.registrationForm = this.formBuilder.group({
        userName: [this.registrationDetails[0].userName,Validators.required],
        mobileNumber: [this.registrationDetails[0].mobileNumber,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        email: [this.registrationDetails[0].email,Validators.required],
        password: [this.registrationDetails[0].password,[Validators.required,Validators.minLength(6)]],
        confirmPassword: [this.registrationDetails[0].password,[Validators.required,Validators.minLength(6)]]
      });
      localStorage.removeItem('RegistrationDetails');
      return;
    }
    this.registrationForm = this.formBuilder.group({
      userName: ['',Validators.required],
      mobileNumber: [[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(6)]]
    });
  }

  onClick() {
    console.log('console');
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    if(password !== confirmPassword) {
      console.log('password-not-match');
      this.passwordIncorrect = true;
      return;
    }
    const regDetails = {
      userName : 'string',
      mobileNumber : Number,
      email : 'string',
      password : password,
      confirmPassword : password
    };
    regDetails.userName = this.registrationForm.get('userName')?.value;
    regDetails.mobileNumber = this.registrationForm.get('mobileNumber')?.value;
    regDetails.email = this.registrationForm.get('email')?.value;
    regDetails.password = this.registrationForm.get('password')?.value;
    regDetails.confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    // const obj = {}
    this.registrationDetails.push(regDetails);
    console.log('registration-details',this.registrationDetails);

    if(typeof (Storage) !== 'undefined') {
      localStorage.setItem('RegistrationDetails', (JSON.stringify(this.registrationDetails)));
      console.log(JSON.stringify(this.registrationDetails));
    }

    this.passwordIncorrect = false;
    this.router.navigateByUrl('app-login-page');
    console.log(this.registrationForm);
  }
}
