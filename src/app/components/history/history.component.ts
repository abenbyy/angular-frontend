import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit() {
  }

  deleteHistory(){
    this.searchService.deleteHistory()
  }

}
