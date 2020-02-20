import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private graphqlService: GraphqlService,
  ) { }


  selectedCar: Car
  ngOnInit() { 
    this.selectedCar = this.searchService.selectedCar


  }

}
