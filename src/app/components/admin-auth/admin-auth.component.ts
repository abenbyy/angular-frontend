import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {

  
  admin$: Subscription

  user =  new FormControl('',[
    Validators.required
  ])
  
  pass= new FormControl('',[
    Validators.required
  ])
  
  constructor(
    private grapqhlService: GraphqlService,
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit() {
    

  }

  validate(){
    this.admin$ = this.grapqhlService.getAdmin(this.user.value, this.pass.value)
    .subscribe(query =>{
      if(query.data.admin.username === this.user.value && query.data.admin.password === this.pass.value){
        this.adminService.isLoggedIn = true
        this.router.navigate(['./admin/manage'])
      }else{
        
      }
    })


  }

}
