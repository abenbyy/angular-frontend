import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {

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
