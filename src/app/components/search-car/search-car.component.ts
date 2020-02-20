import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { CarFilter } from 'src/app/models/carfilter';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {


  constructor(
    private searchService : SearchService,
    private graphqlService : GraphqlService,
    private router: Router
  ) { }

  checkBool = new Array(20).fill(false)
  cars: Car[]
  displayedCars: Car[]
  tempSlice: Car[]
  scrollIdx: number
  brands: string[]
  displayedBrands: string[]
  models: string[]
  displayedModels: string[]
  selectedCity: string
  carFilter : CarFilter
  masterCars : Car[]

  ngOnInit() {

    this.carFilter = new CarFilter()
    this.carFilter.brands = []
    this.carFilter.models = []
    this.carFilter.price = 0
    this.carFilter.capacity = 0
    
    this.masterCars = []

    this.scrollIdx = 0
    this.cars = []
    this.displayedCars = []
    this.cars = this.searchService.carResult

    

    this.masterCars = this.cars

    this.brands = []
    this.displayedBrands = []

    this.models = []
    this.displayedModels = []
  
    this.selectedCity = this.searchService.selectedCarCity

    this.addBrands()
    this.addModels()
    
    
    this.sliceData()

    document.onscroll = function(){
      
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        this.scrollIdx++
        this.sliceData()
      }
    }.bind(this)
    //console.log(this.displayedCars)
  }

  resetFilter(){
    for (let i=0; i< 20;i++){
      this.checkBool[i] = false
    }


  }
  addBrands(){
    for(let i = 0 ; i<this.cars.length ; i++){
      if(this.brands.indexOf(this.cars[i].brand) === -1){
        this.brands.push(this.cars[i].brand)
      }
    }

    var temp = []
    temp = this.brands.slice(0,3)
    this.displayedBrands.push(...temp)

  }

  
  addModels(){
    for(let i = 0; i < this.cars.length ; i++){
      if(this.models.indexOf(this.cars[i].model) === -1){
        this.models.push(this.cars[i].model)
      }
    }

    var temp = []
    temp = this.models.slice(0,5)
    this.displayedModels.push(...temp)

  }
  expandBrand(){
    // var temp = []
    // temp = this.brands.slice(3,this.brands.length)
    // if(this.displayedBrands.indexOf(this.brands[this.brands.length-1]) !== -1){
    //   return
    // }else{
    //   this.displayedBrands.push(...temp)
    // }
    this.displayedBrands = this.brands
  }

  expandModel(){
    this.displayedModels = this.models
  }





  sliceData(){
    this.tempSlice = []

    this.tempSlice = this.cars.slice(this.scrollIdx*5,this.scrollIdx*5+5)

    this.displayedCars.push(...this.tempSlice)
    console.log(this.displayedCars)
  }

  formatLabel(value:number){
    return "IDR "+value
  }


  goToDetail(car: Car){
    this.searchService.selectedCar = car

    this.router.navigate(["./cardetailpage"])
  }

  toggleBrand(val: string){
    if(this.carFilter.brands.indexOf(val) === -1){
      this.carFilter.brands.push(val)
    }else{
      var idx = this.carFilter.brands.indexOf(val)
      this.carFilter.brands.splice(idx,1)
    }

    this.filterCar()
  }

  filterCar(){
    this.cars = []
    if(this.carFilter.brands.length>0){
      this.masterCars.forEach((val)=>{
        for(let i=0;i<this.carFilter.brands.length;i++){
          if(val.brand === this.carFilter.brands[i]){
            this.cars.push(val)
            break
          }
        }
      })
    }

    if(this.carFilter.models.length>0){
      
    }

    if(this.carFilter.price > 0){

    }

    if(this.carFilter.capacity > 0){

    }

  }

}
