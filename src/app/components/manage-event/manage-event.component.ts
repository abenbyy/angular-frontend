import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Subscription } from 'rxjs';
import { Entertainment } from 'src/app/models/entertainment';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

  constructor(
    private router: Router,
    private adminService : AdminService,
    private graphqlService: GraphqlService,
  ) { }

  ent$: Subscription
  cache: Entertainment[]
  ents : Entertainment
  displayed: Entertainment[]
  
  ngOnInit() {
    if(this.adminService.isLoggedIn === false){
      this.router.navigate(['./admin/auth'])
    }

    



  }

}
