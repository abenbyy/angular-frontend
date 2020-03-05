import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { FlightRoute } from 'src/app/models/flightroute';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Airport } from 'src/app/models/airport';
import { Airline } from 'src/app/models/airline';

@Component({
  selector: 'app-flight-editor',
  templateUrl: './flight-editor.component.html',
  styleUrls: ['./flight-editor.component.scss']
})
export class FlightEditorComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
  ) { }

  sub$: Subscription
  
  flight: Flight
  routes: FlightRoute[]
  depdate: String
  arrdate: String

  ngOnInit() {
    this.depdate = ""
    this.arrdate = ""
    this.flight = new Flight()
    this.flight.airline = new Airline()
    this.flight.from = new Airport()
    this.flight.to = new Airport()
    this.routes = []
    var id = this.actRoute.snapshot.paramMap.get('id')

    if(id !==null){
      let i = + id
      this.sub$ = this.graphqlService.getFlight(i)
      .subscribe(async query=>{
        this.flight = query.data.flight
        await this.beautify()
      })
    }
  }

  beautify(){
    document.getElementById("airline").innerText = this.flight.airline.id.toString()
    document.getElementById("from").innerText = this.flight.from.id.toString()
    document.getElementById("to").innerText = this.flight.to.id.toString()
    document.getElementById("duration").innerText = this.flight.duration.toString()
    document.getElementById("price").innerText = this.flight.price.toString()
    console.log(this.flight)
    this.routes = this.flight.routes
  }

  addRoute(){
    let r = new FlightRoute
    r.from = document.getElementById("rfrom").innerText
    r.fromcode = document.getElementById("rfromcode").innerText
    r.to = document.getElementById("rto").innerText
    r.tocode = document.getElementById("rtocode").innerText
    r.flightduration = parseInt(document.getElementById("fdur").innerText)
    r.transitduration = parseInt(document.getElementById("tdur").innerText)
    r.aeroplanetype = document.getElementById("type").innerText
    r.aeroplanename = document.getElementById("name").innerText

    this.routes.push(r)
  }

  
  createFlight(){
    console.log("created")
    this.flight.airline.id = parseInt( document.getElementById("airline").innerText)
    this.flight.from.id = parseInt( document.getElementById("from").innerText)
    this.flight.to.id = parseInt( document.getElementById("to").innerText)
    this.flight.duration = parseInt( document.getElementById("duration").innerText)
    this.flight.price = parseInt( document.getElementById("price").innerText)
    

    if(this.routes.length == 0){
      alert("Routes cannot be empty")
    }
    else if(document.getElementById("airline").innerText===""){
        alert("Airline Id cannot be empty")
    }
    else if(document.getElementById("from").innerText===""){
        alert("From Airport Id cannot be empty")
    }
    else if(document.getElementById("to").innerText===""){
        alert("To Airport Id cannot be empty")
    }
    else if(document.getElementById("duration").innerText===""){
      alert("Duration cannot be empty")
    }
    else if(document.getElementById("price").innerText===""){
      alert("Price cannot be empty")
    }
    let from = []
    let fromc = []
    let to = []
    let toc = []
    let fdur = []
    let tdur = []
    let types = []
    let names = []

    for(let i=0;i<this.routes.length;i++){
      from.push(this.routes[i].from)
      fromc.push(this.routes[i].fromcode)
      to.push(this.routes[i].to)
      toc.push(this.routes[i].tocode)
      fdur.push(this.routes[i].flightduration)
      tdur.push(this.routes[i].transitduration)
      types.push(this.routes[i].aeroplanetype)
      names.push(this.routes[i].aeroplanename)
    }

    this.sub$ = this.graphqlService.createFlight(this.flight,from,fromc,to,toc,fdur,tdur,types,names)
    .subscribe(async mutation=>{
      await alert("Flight has been created")
    })


  }
 
  updateFlight(){
    this.flight.airline.id = parseInt( document.getElementById("airline").innerText)
    this.flight.from.id = parseInt( document.getElementById("from").innerText)
    this.flight.to.id = parseInt( document.getElementById("to").innerText)
    this.flight.duration = parseInt( document.getElementById("duration").innerText)
    this.flight.price = parseInt( document.getElementById("price").innerText)

    if(document.getElementById("airline").innerText===""){
        alert("Airline Id cannot be empty")
    }
    else if(document.getElementById("from").innerText===""){
        alert("From Airport Id cannot be empty")
    }
    else if(document.getElementById("to").innerText===""){
        alert("To Airport Id cannot be empty")
    }
    else if(document.getElementById("duration").innerText===""){
      alert("Duration cannot be empty")
    }
    else if(document.getElementById("price").innerText===""){
      alert("Price cannot be empty")
    }
    let i = + this.actRoute.snapshot.paramMap.get('id')

    this.sub$ = this.graphqlService.updateFlight(i,this.flight)
    .subscribe(async mutation=>{
      await alert("Flight has been updated")
    })
  }

  dep(type: string, event: MatDatepickerInputEvent<Date>) {
    this.depdate = `${event.value}`
    
  }

  arr(type: string, event: MatDatepickerInputEvent<Date>) {
    this.arrdate = `${event.value}`
    
  }



}
