import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  registrationDetails: any[] =[];
  // userDetails: userDetailsModel[] = [];
  // dataSource: any;
  // displayedColumns: string[] = ['User-Name', 'Mobile-Number', 'e-mail', 'Password'];
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(typeof(Storage) !== 'undefined' && (localStorage.getItem('RegistrationDetails'))) {
      this.registrationDetails = (JSON.parse(localStorage.getItem('RegistrationDetails') || '{}'));
      console.log(this.registrationDetails);
      console.log(this.registrationDetails[0].userName);
    }
  }

  onEditClick() {
    this.router.navigateByUrl('app-registration-page');
  }

  onDeleteClick() {
    localStorage.removeItem('RegistrationDetails');
    this.router.navigateByUrl('');
    // this.router.navigateByUrl('app-user-details');
  }

}
