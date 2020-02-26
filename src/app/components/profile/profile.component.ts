import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'src/app/models/dropdown';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { HttpClient } from '@angular/common/http';




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
    private accountService: AccountService,
    private http: HttpClient,
  ) { 
    
  }

  ngOnInit() {
   
  }

  updateProfile(){
    
  }

  validatePhoneNumber(val: string){
    this.http.get("http://apilayer.net/api/validate?access_key=0317a1b34af44bd06b69e5e26b563b45&number="+val+"&country_code=&format=1")
    .subscribe((response: Response)=>{
      var res = response.json()
      return res["valid"]
    })
  }

  

}
