import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-hotel-editor',
  templateUrl: './hotel-editor.component.html',
  styleUrls: ['./hotel-editor.component.scss']
})
export class HotelEditorComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
  ) { }

  sub$: Subscription
  imgSrc: string
  facility: boolean[]

  hotel: Hotel
  
  ngOnInit() {

    this.imgSrc = ""
    this.facility = new Array(9).fill(false)
    this.hotel = new Hotel()

    var id = this.actRoute.snapshot.paramMap.get('id')

    if(id !==null){
      let i = + id
      this.sub$ = this.graphqlService.getHotel(i)
      .subscribe(async query=>{
        this.hotel = query.data.hotel
        await this.beautify()
      })
    }
  }

  beautify(){
    document.getElementById("name").innerText = this.hotel.name
    document.getElementById("address").innerText = this.hotel.address
    document.getElementById("area").innerText = this.hotel.area
    document.getElementById("city").innerText = this.hotel.city
    document.getElementById("province").innerText = this.hotel.province
    document.getElementById("rating").innerText = this.hotel.rating.toString()
    document.getElementById("latitude").innerText = this.hotel.latitude.toString()
    document.getElementById("longitude").innerText = this.hotel.longitude.toString()
    this.facility[0] = this.hotel.facilities[0].ac
    this.facility[1] = this.hotel.facilities[0].parking
    this.facility[2] = this.hotel.facilities[0].receptionist
    this.facility[3] = this.hotel.facilities[0].pool
    this.facility[4] = this.hotel.facilities[0].lift
    this.facility[5] = this.hotel.facilities[0].restaurant
    this.facility[6] = this.hotel.facilities[0].wifi
    this.facility[7] = this.hotel.facilities[0].spa
    this.imgSrc = this.hotel.image
  }

  action(val){
    document.execCommand(val)
  }

  onFileChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imgSrc = reader.result;
    //console.log(this.imgSrc)
  }

  createHotel(){
    
    this.hotel.name = document.getElementById("name").innerText
    this.hotel.address = document.getElementById("address").innerText
    this.hotel.area = document.getElementById("area").innerText
    this.hotel.city = document.getElementById("city").innerText
    this.hotel.province = document.getElementById("province").innerText
    this.hotel.rating = parseFloat(document.getElementById("rating").innerText)
    this.hotel.latitude = parseFloat(document.getElementById("latitude").innerText)
    this.hotel.longitude = parseFloat(document.getElementById("longitude").innerText)
    this.hotel.image = this.imgSrc

    
    if(this.hotel.name === ""){
      alert("Name cannot be empty!")
      return
    }else if(this.hotel.address === ""){
      alert("Address cannot be empty!")
      return
    }else if(this.hotel.area === ""){
      alert("Area cannot be empty!")
      return
    }else if(this.hotel.city === ""){
      alert("City cannot be empty!")
      return
    }else if(this.hotel.province === ""){
      alert("Province cannot be empty!")
      return
    }else if(document.getElementById("rating").innerText === ""){
      alert("Rating cannot be empty!")
      return
    }else if(document.getElementById("latitude").innerText === ""){
      alert("Latitude cannot be empty!")
      return
    }else if(document.getElementById("longitude").innerText === ""){
      alert("Longitude cannot be empty!")
      return
    }
    

    this.sub$= this.graphqlService.createHotel(this.hotel,this.facility)
    .subscribe(async mutate=>{
      await alert("Hotel has been added")
    })
  }

  updateHotel(){
    console.log("updating")
    this.hotel.name = document.getElementById("name").innerText
    this.hotel.address = document.getElementById("address").innerText
    this.hotel.area = document.getElementById("area").innerText
    this.hotel.city = document.getElementById("city").innerText
    this.hotel.province = document.getElementById("province").innerText
    this.hotel.rating = parseFloat(document.getElementById("rating").innerText)
    this.hotel.latitude = parseFloat(document.getElementById("latitude").innerText)
    this.hotel.longitude = parseFloat(document.getElementById("longitude").innerText)
    this.hotel.image = this.imgSrc

    
    if(this.hotel.name === ""){
      alert("Name cannot be empty!")
      return
    }else if(this.hotel.address === ""){
      alert("Address cannot be empty!")
      return
    }else if(this.hotel.area === ""){
      alert("Area cannot be empty!")
      return
    }else if(this.hotel.city === ""){
      alert("City cannot be empty!")
      return
    }else if(this.hotel.province === ""){
      alert("Province cannot be empty!")
      return
    }else if(document.getElementById("rating").innerText === ""){
      alert("Rating cannot be empty!")
      return
    }else if(document.getElementById("latitude").innerText === ""){
      alert("Latitude cannot be empty!")
      return
    }else if(document.getElementById("longitude").innerText === ""){
      alert("Longitude cannot be empty!")
      return
    }
    

    this.sub$= this.graphqlService.updateHotel(this.hotel.id,this.hotel,this.facility)
    .subscribe(async mutate=>{
      await alert("Hotel has been updated")
    })
  }


}
