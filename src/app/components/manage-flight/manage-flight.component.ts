import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit {

  constructor(
    private grapqhlService: GraphqlService,
    private router: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit() {

    // if(this.adminService.isLoggedIn === false){
    //   this.router.navigate(['./admin/auth'])
    // }
  }

}
