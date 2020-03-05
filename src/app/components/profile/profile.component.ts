import { Component, OnInit } from '@angular/core';
import { Dropdown } from 'src/app/models/dropdown';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';




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

  addressControl = new FormControl('',[
    Validators.required,
  ])

  zipControl = new FormControl('',[
    Validators.required,
  ])

  langControl = new FormControl('',[
    Validators.required,
  ])

  user: User
  sub$ : Subscription

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private graphqlService: GraphqlService,
  ) { 
    
  }

  ngOnInit() {
    this.user = this.accountService.user
  }

  updateProfile(){
    this.user.firstname = this.firstNameControl.value
    this.user.lastname = this.lastNameControl.value
    this.user.phone = this.phoneControl.value
    this.user.city = this.cityControl.value
    this.user.address = this.addressControl.value
    this.user.postcode = this.zipControl.value
    this.user.language = this.langControl.value
    
    this.sub$ = this.graphqlService.updateUser(this.user)
    .subscribe(mutation=>{
      this.user = mutation.data.updateUser
      this.accountService.user = mutation.data.updateuser
    })
    
  }

  validatePhoneNumber(){
    var fetchPromise = fetch("http://apilayer.net/api/validate?access_key=0317a1b34af44bd06b69e5e26b563b45&number="+this.phoneControl.value+"&country_code=&format=1");
    fetchPromise.then(response => {
      return response.json();
      }).then(q => {
       if(q.valid === true){
         this.updateProfile()
       }else{
         alert("Phone Number is fake!!")
       }
  
    });

    
  }

  

}
