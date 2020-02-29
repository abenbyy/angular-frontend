import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Subscription } from 'rxjs';
import { Promo } from 'src/app/models/promo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  promo$: Subscription
  promos: Promo[]

  constructor(
    private graphqlService: GraphqlService,
    private router: Router
  ) { }

  ngOnInit(){

    this.promo$ = this.graphqlService.getAllPromos()
    .subscribe(query => {
      this.promos = query.data.allpromos
    })

    
    
  }

  goToDetail(val:Promo){
    this.router.navigate(['./promos',val.id])
  }

}
