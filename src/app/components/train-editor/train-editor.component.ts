import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Train } from 'src/app/models/train';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'app-train-editor',
  templateUrl: './train-editor.component.html',
  styleUrls: ['./train-editor.component.scss']
})
export class TrainEditorComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
  ) { }

  sub$: Subscription
  trip: Trip
  
  depdate:string
  arrdate:string

  ngOnInit() {

    this.trip = new Trip()
    this.trip.train = new Train()
    this.trip.from = new Station()
    this.trip.to = new Station()
    
    var id = this.actRoute.snapshot.paramMap.get('id')

    if(id !==null){
      let i = + id
      this.sub$ = this.graphqlService.getTrip(i)
      .subscribe(async query=>{
        this.trip = query.data.trip
        await this.beautify()
      })
    }

  }

  beautify(){
    document.getElementById("train").innerText = this.trip.train.id.toString()
    document.getElementById("from").innerText = this.trip.from.id.toString()
    document.getElementById("to").innerText = this.trip.to.id.toString()
    document.getElementById("duration").innerText = this.trip.duration.toString()
    document.getElementById("price").innerText = this.trip.price.toString()
    
  }

  createTrip(){
    this.trip.train.id = parseInt(document.getElementById("train").innerText)
    this.trip.from.id = parseInt(document.getElementById("from").innerText)
    this.trip.to.id = parseInt(document.getElementById("to").innerText)
    this.trip.duration = parseInt(document.getElementById("duration").innerText)
    this.trip.price = parseInt(document.getElementById("price").innerText)

    if(document.getElementById("train").innerText === ""){
      alert("Train ID cannot be empty")
    }else if(document.getElementById("from").innerText === ""){
      alert("From Station ID cannot be empty")
    }else if(document.getElementById("to").innerText === ""){
      alert("To Station ID cannot be empty")
    }else if(document.getElementById("duration").innerText === "" || this.trip.duration <=0){
      alert("Trip duration is invalid")
    }else if(document.getElementById("price").innerText === "" || this.trip.price <=0){
      alert("Trip price is invalid")
    }

    this.sub$ = this.graphqlService.createTrip(this.trip)
    .subscribe(async mutation=>{
      await alert("Trip has been posted")
    })

  }

  updateTrip(){
    this.trip.train.id = parseInt(document.getElementById("train").innerText)
    this.trip.from.id = parseInt(document.getElementById("from").innerText)
    this.trip.to.id = parseInt(document.getElementById("to").innerText)
    this.trip.duration = parseInt(document.getElementById("duration").innerText)
    this.trip.price = parseInt(document.getElementById("price").innerText)

    if(document.getElementById("train").innerText === ""){
      alert("Train ID cannot be empty")
    }else if(document.getElementById("from").innerText === ""){
      alert("From Station ID cannot be empty")
    }else if(document.getElementById("to").innerText === ""){
      alert("To Station ID cannot be empty")
    }else if(document.getElementById("duration").innerText === "" || this.trip.duration <=0){
      alert("Trip duration is invalid")
    }else if(document.getElementById("price").innerText === "" || this.trip.price <=0){
      alert("Trip price is invalid")
    }

    this.sub$ = this.graphqlService.updateTrip(this.trip.id,this.trip)
    .subscribe(async mutation=>{
      await alert("Trip has been updated")
    })
  }

  dep(type: string, event: MatDatepickerInputEvent<Date>) {
    this.depdate = `${event.value}`
    
  }
  arr(type: string, event: MatDatepickerInputEvent<Date>) {
    this.arrdate = `${event.value}`
  }
}
