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
  selectedTitle: string 
  selectedCity: string


  firstNameControl = new FormControl('',[
    Validators.required,
  ])

  lastNameControl = new FormControl('',[
    Validators.required,
  ])

  cityControl = new FormControl('',[
    Validators.required,
  ])

  titleControl = new FormControl('',[
    Validators.required,
  ])

  phoneControl = new FormControl('',[
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
    var title = this.titleControl.value
    var firstname = this.firstNameControl.value
    var lastname = this.lastNameControl.value
    var phone = this.phoneControl.value
    var city = this.cityControl.value
    
  }

  validatePhoneNumber(){
    var res = ""
    this.http.get("http://apilayer.net/api/validate?access_key=0317a1b34af44bd06b69e5e26b563b45&number="+this.phoneControl.value+"&country_code=&format=1")
    .subscribe((response: Response)=>{
      var res = response.json()
      if(res["valid"] === true){
        this.updateProfile()
      }else{
        return
      }
    })
  }

  

}
