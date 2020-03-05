import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat';
import { AdminService } from 'src/app/services/admin.service';
import { AccountService } from 'src/app/services/account.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})

export class ChatDetailComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private actRoute:ActivatedRoute, 
    private route:Router, 
    private chatService: ChatService,
    private adminService: AdminService,
    private accService: AccountService) { }

  //imageModal: MatDialogRef<ChatImageModalComponent>;

  chats:Message[]=[]
  inputChat:string=null
  userId:number=-1
  chatId:number=0
  imgSrc: string
  //dwnSrc: string

  ngOnInit() {
    if(this.adminService.getAdmin() === false){
      this.userId = parseInt(sessionStorage.getItem("userid"))
      console.log(this.userId)
    }
    this.getChatData()    
  }

  getChatData(){
    this.chatId=parseInt(this.actRoute.snapshot.paramMap.get("id"))
    this.chatService.getChat(this.chatId)
    .subscribe(async query=>{
      // console.log(q.data.getChatById[0].content)
      console.log(query)
      if(query.data.chat[0].content!=""){
        this.chats=JSON.parse(`${query.data.chat[0].content}`)
      }
      await this.addWebsocket()
    })
  }

  addWebsocket(){
    this.chatService.listen("chat-event")
    .subscribe(async data=>{
      await console.log(data)
      await this.assignChat(data)
    })
  }

  assignChat(data:any){
    var chatData=JSON.parse(data.toString())
    this.chats.push({
      user:chatData.user,
      content:chatData.content
    })
    this.updateChatDB()
  }

  sendMsg(){
    var msg={
      user:this.userId,
      content:this.inputChat
    }
    this.chatService.emit("chat-event",JSON.stringify(msg))
    this.inputChat=null
  }
  sendImg(){
    var msg={
      user:this.userId,
      content:this.imgSrc
    }
    this.chatService.emit("chat-event",JSON.stringify(msg))
    this.inputChat=null
  }

  updateChatDB(){
    var chat=JSON.stringify(this.chats)
    
    this.chatService.updateChat(this.chatId,chat)
    .subscribe(async q=>{
    
    })
  }

  checkUserId(idx:number){
    return this.chats[idx].user==this.userId
  }

  backToMain(){
    this.chatService.removeListener('chat-event')
    this.route.navigate(['/chat'])
  }

  selectedFile:File

  onFileChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imgSrc = reader.result;
    console.log(this.imgSrc)
    this.sendImg()
  }

  
  checkContentIsImage(idx:number):string{
    var content=this.chats[idx].content
    var sC=content.split(":")
    if(sC.length>1&&sC[0]=="data"){
      var aC=""
      for (let i = 1; i < sC.length; i++) {
        aC+=sC[i]
      }
      this.imgSrc = this.chats[idx].content
      //this.dwnSrc = this.chats[idx].content.slice(23)
      //console.log(this.imgSrc)
      //console.log(this.dwnSrc)
      return this.imgSrc
    }
    else{
      this.imgSrc = ""
      //this.dwnSrc = ""
      return ""
    }
  }

  openModal(image: string){
    this.chatService.selectedImg = image
    this.dialog.open(ImageModalComponent,{
      height: '80vh',
      width: '100vw'
      
    })
  }

}


export class Message{
  user: number
  content: string
}