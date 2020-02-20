import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login/login-modal.component'
import { AccountService } from 'src/app/services/account.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public logDialog: MatDialog,
    public accountService: AccountService,
    public searchService: SearchService,
  ) { }

  ngOnInit() {

  }

  changeToFlight(){
    this.searchService.isSpecified = true
    this.searchService.specIdx = 0
  }

  changeToTrain(){
    this.searchService.isSpecified = true
    this.searchService.specIdx = 2
  }

  changeToDefault(){
    this.searchService.isSpecified = false
    this.searchService.specIdx = -1
  }

  showLoginModal(){
    this.logDialog.open(LoginModalComponent,{
      height: '75vh',
      width: '600px',
      minWidth: '400px',
      minHeight: '35vh',
    })
  }

  showRegisterModal(){
    this.logDialog.open(LoginModalComponent,{
      height: '75vh',
      width: '30vw',
      minWidth: '20vw',
      minHeight: '35vh',
    })
  }
}
