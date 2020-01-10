import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'src/app/models/dropdown';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  titles: Dropdown[] = [
    {value: 'Mr.', viewValue: 'Mr.'},
    {value: 'Mrs.', viewValue: 'Mrs.'},
    {value: 'Miss', viewValue: 'Miss'},
  ]
  selectedTitle: string

  cities: Dropdown[] = [
    {value: 'Jakarta', viewValue: 'Jakarta'},
    {value: 'Bogor', viewValue: 'Bogor'},
    {value: 'Depok', viewValue: 'Depok'},
    {value: 'Tangerang', viewValue: 'Tangerang'},
    {value: 'Bekasi', viewValue: 'Bekasi'},
  ]
  selectedCity: string


  firstNameControl = new FormControl('',[
    Validators.required,
  ])

  lastNameControl = new FormControl('',[
    Validators.required,
  ])
  constructor(
    private accountService: AccountService
  ) { 
    
  }

  ngOnInit() {
   
  }

}
