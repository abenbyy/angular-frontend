import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';
import { Entertainment } from 'src/app/models/entertainment';
import { EntertainmentTicket } from 'src/app/models/entertainmentticket';

@Component({
  selector: 'app-order-entertainment',
  templateUrl: './order-entertainment.component.html',
  styleUrls: ['./order-entertainment.component.scss']
})
export class OrderEntertainmentComponent implements OnInit {


  user: User
  selectedTickets: EntertainmentTicket[]
  selectedEnt: Entertainment
  ticketQtys: number[]
  selectedQtys: number[]

  totalPrice: number
  timerMinute: number
  timerSecond:number
  timerHtml: HTMLElement

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.timerMinute = 10
    this.timerSecond = 0
    if(this.accountService.user === null){
      this.user = new User()
      this.user.firstname = ""
      this.user.lastname = ""
      this.user.email = ""
      this.user.phone = ""
    }else{
      
      this.user = this.accountService.user

    }

    this.selectedTickets = []
    this.selectedQtys = []
    this.totalPrice = 0
    this.selectedEnt = this.orderService.selectedEnt
    this.ticketQtys = this.orderService.ticketQtys

    for(let i=0;i<this.ticketQtys.length;i++){
      if (this.ticketQtys[i] > 0){
        this.selectedTickets.push(this.selectedEnt.tickets[i])
        this.selectedQtys.push(this.ticketQtys[i])
        this.totalPrice += this.selectedEnt.tickets[i].price * this.ticketQtys[i]
      }
    }

    
      this.startTimer()
    
    


    
  }

  startTimer(){
    var time = document.querySelector("#timer") as HTMLElement
    this.timerMinute = 10
    this.timerSecond = 0
    var a = setInterval(function(){
      time.innerText = this.timerMinute+" : "+this.timerSecond
      this.timerSecond--
      if(this.timerSecond < 0){
        this.timerMinute--
        this.timerSecond = 59
      }
      if(this.timerMinute<0){
        clearInterval(a)
      }
    }.bind(this), 1000)

  }

}
