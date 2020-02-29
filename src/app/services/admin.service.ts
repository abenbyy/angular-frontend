import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  isLoggedIn: boolean

  deletedIdx: number
  deletedType: string

  constructor() { 
    this.isLoggedIn = false
  }


}
