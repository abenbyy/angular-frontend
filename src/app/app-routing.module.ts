import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchTrainComponent } from './components/search-train/search-train.component';
import { HomepageSliderComponent } from './components/homepage-slider/homepage-slider.component';
import { SearchHotelComponent } from './components/search-hotel/search-hotel.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';


const routes: Routes = [
  {
    path:'',
    component: QuickSearchComponent
  },
  // {
  //   path:'',
  //   component: HomepageSliderComponent
  // },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'flights',
    component: QuickSearchComponent
  },
  {
    path:'train',
    component: QuickSearchComponent
  },
  {
    path:'searchresult',
    component: SearchResultComponent
  },
  {
    path:'searchhotel',
    component: SearchHotelComponent
  },
  {
    path:'searchtrip',
    component: SearchTrainComponent
  },
  {
    path:'detailpage',
    component: HotelDetailComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
