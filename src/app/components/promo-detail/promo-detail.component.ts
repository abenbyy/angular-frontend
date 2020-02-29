import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Promo } from 'src/app/models/promo';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss']
})
export class PromoDetailComponent implements OnInit {

  promo$: Subscription
  opromo$: Subscription
  selectedPromo: Promo

  otherPromos: Promo[]

  constructor(
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
    
  ) { }

  ngOnInit() {
    var id = + this.actRoute.snapshot.paramMap.get('id')
    this.promo$ = this.graphqlService.getPromo(id)
    .subscribe(query=>{
      this.selectedPromo = query.data.promo
    })

    this.opromo$ = this.graphqlService.getOtherPromos(id)
    .subscribe(query =>{
      this.otherPromos = query.data.otherpromos
    })


    
  }

  share(arg:string){
    if(arg === "Facebook"){
      //href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fblog.tiket.com%2Ftempat-wisata-di-seoul-untuk-liburan-keluarga%2F"
      window.open("https://www.facebook.com/sharer.php?")
    }
    else if(arg === "Line"){
      //href="http://line.me/R/msg/text/?15+Pemandangan+Alam+Terindah+di+Indonesia+Ini+Bikin+Takjub+%7C+tiket.com%20https%3A%2F%2Fblog.tiket.com%2Fpemandangan-alam-terindah-di-indonesia%2F"
      window.open("http://line.me/R/msg/text/?"+document.URL)
    }
    else if(arg === "Whatsapp"){
      //href="https://api.whatsapp.com/send?text=15%20Pemandangan%20Alam%20Terindah%20di%20Indonesia%20Ini%20Bikin%20Takjub%20%7C%20tiket.com%20https%3A%2F%2Fblog.tiket.com%2Fpemandangan-alam-terindah-di-indonesia%2F"
      window.open( "https://api.whatsapp.com/send?text="+document.URL)
    }

  }

}
