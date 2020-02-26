import { Injectable } from '@angular/core';
import { Entertainment } from '../models/entertainment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  selectedEnt: Entertainment
  ticketQtys: any[]
  
  constructor() { 
    this.selectedEnt = null
    this.ticketQtys = [] 
  }


}
