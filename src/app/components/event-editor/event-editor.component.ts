import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entertainment } from 'src/app/models/entertainment';
import { EntertainmentTicket } from 'src/app/models/entertainmentticket';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
  ) { }

  sub$: Subscription
  imgSrc: string
  ent: Entertainment
  tickets: EntertainmentTicket[]
  date:string
  ngOnInit() {

    this.date = ""
    this.imgSrc = ""
    this.ent = new Entertainment()
    var id = this.actRoute.snapshot.paramMap.get('id')
    this.tickets = []

    if(id !==null){
      let i = + id
      this.sub$ = this.graphqlService.getEntertainment(i)
      .subscribe(async query=>{
        this.ent = query.data.entertainment
        await this.beautify()
      })
    }

  }

  action(val){
    document.execCommand(val)
  }

  beautify(){
    console.log(this.ent)
    document.getElementById("name").innerText = this.ent.name
    document.getElementById("type").innerText = this.ent.type
    document.getElementById("address").innerText = this.ent.address
    document.getElementById("latitude").innerText = this.ent.latitude.toString()
    document.getElementById("longitude").innerText = this.ent.longitude.toString()
    document.getElementById("description").innerText = this.ent.description
    document.getElementById("terms").innerText = this.ent.terms

    this.imgSrc = this.ent.image
    this.tickets = this.ent.tickets
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

  addTicket(){
    let t = new EntertainmentTicket
    t.name = document.getElementById("tickname").innerText
    t.price = parseInt(document.getElementById("tickprice").innerText)

    this.tickets.push(t)
  }

  createEvent(){
    this.ent.name = document.getElementById("name").innerText
    this.ent.type = document.getElementById("type").innerText
    this.ent.address = document.getElementById("address").innerText
    this.ent.latitude = parseFloat(document.getElementById("latitude").innerText)
    this.ent.longitude = parseFloat(document.getElementById("longitude").innerText)
    this.ent.description = document.getElementById("description").innerText
    this.ent.terms = document.getElementById("terms").innerText
    this.ent.image = this.imgSrc

    let names = []
    let prices = []

    for(let i=0;i<this.tickets.length;i++){
      names.push(this.tickets[i].name)
      prices.push(this.tickets[i].price)
    }

    if(this.ent.name === ""){
      alert("Event Name cannot be empty!")
    }
    else if(this.ent.type === ""){
      alert("Event Type cannot be empty!")
    }
    else if(this.ent.address === ""){
      alert("Event Address cannot be empty!")
    }
    else if(document.getElementById("latitude").innerText === ""){
      alert("Event Latitude cannot be empty!")
    }
    else if(document.getElementById("longitude").innerText === ""){
      alert("Event Longitude cannot be empty!")
    }
    else if(this.ent.description === ""){
      alert("Event Description cannot be empty!")
    }
    else if(this.ent.terms === ""){
      alert("Event Terms cannot be empty!")
    }

    this.sub$ = this.graphqlService.createEntertainment(this.ent,this.date,names,prices)
    .subscribe(async mutation=>{
      await alert("Event has been posted")
    })
  }

  updateEvent(){
    this.ent.name = document.getElementById("name").innerText
    this.ent.type = document.getElementById("type").innerText
    this.ent.address = document.getElementById("address").innerText
    this.ent.latitude = parseFloat(document.getElementById("latitude").innerText)
    this.ent.longitude = parseFloat(document.getElementById("longitude").innerText)
    this.ent.description = document.getElementById("description").innerText
    this.ent.terms = document.getElementById("terms").innerText
    this.ent.image = this.imgSrc

    let names = []
    let prices = []

    for(let i=0;i<this.tickets.length;i++){
      names.push(this.tickets[i].name)
      prices.push(this.tickets[i].price)
    }
    let i = + this.actRoute.snapshot.paramMap.get('id')

    this.sub$ = this.graphqlService.updateEntertainment(i,this.ent,this.date)
    .subscribe(async mutation=>{
      await alert("Event has been updated")
    })
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = `${event.value}`
    console.log(this.date)
  }

}
