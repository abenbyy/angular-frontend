import { Component, OnInit, Inject, Input } from '@angular/core';
import { DialogData } from '../search-result/search-result.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  
  
  constructor(
   private chatService: ChatService,

  ) { }

  imgSrc:string
  ngOnInit() {
    this.imgSrc = this.chatService.selectedImg
  }

}
