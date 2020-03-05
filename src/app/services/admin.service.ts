import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  //isLoggedIn: boolean

  deletedIdx: number
  deletedType: string

  constructor() { 
    localStorage.setItem("isLoggedin","false")
  }

  setAdmin(){
    localStorage.setItem("isLoggedin","true")
  }

  getAdmin(){
    if(localStorage.getItem("isLoggedin") === "true"){
      return true
    }
    else{
      return false
    }
  }


}
