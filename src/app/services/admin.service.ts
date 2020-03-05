import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  //isLoggedIn: boolean

  deletedIdx: number
  deletedType: string

  constructor() { 
    
  }

  setAdmin(){
    localStorage.setItem("isLoggedin","true")
  }

  getAdmin(){
    if(localStorage.getItem("isLoggedin") === null){
      return false
    }
    else{
      return true
    }
  }


}
