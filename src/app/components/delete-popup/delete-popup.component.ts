import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private graphqlService: GraphqlService,
    private dialog: MatDialog,
  ) { }

  sub$: Subscription

  isLoading: boolean
  ngOnInit() {
    this.isLoading = false
  }

  no(){
    this.dialog.closeAll()
  }

  yes(){
    if(this.adminService.deletedType === "Blog"){
      this.deleteBlog()
    }
  }

  
  deleteBlog(){
    
    
  }

}
