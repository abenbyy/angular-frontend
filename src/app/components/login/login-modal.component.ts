import { Component, OnInit } from '@angular/core';

import { GoogleLoginService } from '../../services/google-login.service';

import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { subscribe } from 'graphql';
import { async } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account.service';
import { Dropdown } from 'src/app/models/dropdown';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})


export class LoginModalComponent implements OnInit {
  
  public sheetId: string
  public sheet: any
  public foundSheet: any
  public isLogin:boolean
  public hide:boolean
  public inputtedPass: string
  emailPhoneControl= new FormControl('', [
    Validators.required,

  ])

  passwordLoginControl = new FormControl('',[
    Validators.required,
    
  ])

  firstNameControl= new FormControl('', [
    Validators.required,

  ])
  
  lastNameControl= new FormControl('', [
    Validators.required,

  ])
  
  passwordControl= new FormControl('', [
    Validators.required,

  ])

  phoneControl = new FormControl('',[
    Validators.required,
  ])

  codes: Dropdown[] = [
    {value: '+62', viewValue: 'Indonesia (+62)'},
    {value: '+61', viewValue: 'Australia (+61)'},
  ]

  user$: Subscription
  user: User[] = []
  newuser:User
  arg :string
  selectedCode: string
  isNewUser: boolean
  isIncorrectPass: boolean

  constructor(
    private googleLoginService: GoogleLoginService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    public logDialog: MatDialog,
    public graphqlService: GraphqlService,
    public accountService: AccountService) {
    this.gapiService.onLoad().subscribe(); 
    
}

  ngOnInit() {
    this.isNewUser = true
    this.isLogin = true
    this.newuser = new User()
    this.hide = true
        this.route.fragment.subscribe((fragment) => {
        console.log(fragment)
    })
  }

  ngOnDestroy():void{
    this.user$.unsubscribe()
  }
  public isLoggedIn(): boolean {
    return this.googleLoginService.isUserSignedIn()
  }

  public googleSignIn() {
    this.googleLoginService.signIn()
    
    this.logDialog.closeAll()
    
  }

  public validateLogin(){    
    if(this.user[0].email === this.emailPhoneControl.value && this.user[0].password === this.passwordLoginControl.value){
      console.log("Validation Success!")
      this.logDialog.closeAll()
      this.accountService.user = this.user[0]
      this.accountService.isLoggedIn = true
    }else{
      console.log("Validation Fail!")
      this.isIncorrectPass = true
    }
  }

  public userIsNull():void{
    //console.log(this.user)
    if(this.user.length == 0){
      this.isNewUser = true;
      this.switchForm();
    }else{
      this.isNewUser = false;
    }
  }

  public createUser():void{
    
    this.newuser.firstname = this.firstNameControl.value
    this.newuser.lastname = this.lastNameControl.value
    this.newuser.password = this.passwordControl.value
    this.newuser.email = this.emailPhoneControl.value
    this.newuser.phone = this.selectedCode + this.phoneControl.value
    
    console.log(this.newuser);
    this.graphqlService.createUser(this.newuser).subscribe(
      async query=>{
        this.user = query.data.createuser
        await console.log(this.user);
      }
    );
    this.accountService.setUser(this.newuser)
    this.logDialog.closeAll()
  }

  public checkUserAccount():void{
    this.user = [];
    //console.log(this.emailPhoneControl.value)
    this.arg = this.emailPhoneControl.value
    this.user$ = this.graphqlService.searchUserByEmailorPhone(this.arg)
    .subscribe(async query=>{
      this.user = query.data.userbyphoneoremail
      await console.log(this.user)
      await this.userIsNull()
    })

  }

  public switchForm():void{
    this.isLogin = !this.isLogin
  }

  // public facebookSignIn(){
  //   // this.router.navigate(['./home']);
  //   FB.getLoginStatus((response) => {
  //       if (response.status === 'connected') {
  //           this.router.navigate(['/']);
            
  //       }
  //       else {
  //           FB.login((loginResponse)=>{
  //               this.router.navigate(['/']);
  //           });
  //       }
  //       this.logDialog.closeAll();
  //   });
  // }

}
