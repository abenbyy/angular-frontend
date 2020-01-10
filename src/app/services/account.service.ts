import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public user: User
  public isLoggedIn: boolean


  constructor() {
    this.user = null
  }

  public setUser(currUser: User):void{
    this.user = currUser
    this.isLoggedIn = true
    console.log(this.user)
  }

  public destroyUser():void{
    this.user = null
    this.isLoggedIn = false
  }

}
