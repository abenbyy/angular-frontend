import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-nearest-hotel',
  templateUrl: './nearest-hotel.component.html',
  styleUrls: ['./nearest-hotel.component.scss']
})
export class NearestHotelComponent implements OnInit {
  userLat
  userLong
  hotel$: Subscription
  hotels:Hotel[]
  isLoading: boolean

  constructor(
    private graphqlService: GraphqlService,
  ) {

    this.isLoading = true
   }
 
  
  ngOnInit() {
    this.getLocation()
  }

  getHotel(){
    //console.log(this.userLat)
    this.hotel$ = this.graphqlService.nearestHotels(this.userLat, this.userLong)
    .subscribe(async query =>{
      this.hotels = query.data.nearesthotel
      this.isLoading = false
      await console.log(this.hotels)
    })
    
    
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position)=>{
          this.userLong = position.coords.longitude;
          this.userLat= position.coords.latitude;
          await this.getHotel()
        });
    } else {
       console.log("No support for geolocation")
    }
  }

}
