import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  changeToFlight(){
    this.searchService.isSpecified = true
    this.searchService.specIdx = 0
  }

  changeToTrain(){
    this.searchService.isSpecified = true
    this.searchService.specIdx = 2
  }
}
