import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';
import { AdminService } from 'src/app/services/admin.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private route:Router, 
    private chatServ:ChatService,
    private adminService: AdminService,
    private accService: AccountService,) { }

  chats:Chat[]=[]
  userId:number=-1

  ngOnInit() {
    alert(this.adminService.getAdmin())
    if(this.adminService.getAdmin() === false){
      this.userId = parseInt(sessionStorage.getItem("userid"))
      
    }

    this.getAllChat()
  }


  getAllChat(){
    this.chatServ.getAllChat(this.userId).subscribe(async query=>{
      this.chats = query.data.allchat
      
    })
  }

  // backToHome(){
  //   if(localStorage.getItem("chat-user")!=null&&sessionStorage.getItem("User")!=null){
  //     localStorage.removeItem("chat-user")
  //     this.route.navigate(['/'])
  //   }
  //   else if(localStorage.getItem("chat-admin")!=null&&sessionStorage.getItem("Admin")!=null){
  //     localStorage.removeItem("chat-admin")
  //     this.route.navigate(['/admin'])
  //   }
  // }

  validateUser1Id(idx:number){
    return this.userId!=this.chats[idx].user1
  }

  validateUser2Id(idx:number){
    return this.userId!=this.chats[idx].user2
  }

  openChat(idx:number){
    var id=this.chats[idx].id
    this.route.navigate(['./chat',id])
  }

  createNewChat(){
    var friendId=prompt("Input Friend ID")
    if(friendId==null){
      return
    }
    this.chatServ.insertChat(this.userId,parseInt(friendId))
    .subscribe(async query=>{
      await alert("Success Create New Chat")
      await this.getAllChat()
    })
  }


}
