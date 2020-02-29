import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchTrainComponent } from './components/search-train/search-train.component';
import { HomepageSliderComponent } from './components/homepage-slider/homepage-slider.component';
import { SearchHotelComponent } from './components/search-hotel/search-hotel.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SearchHotelMapComponent } from './components/search-hotel-map/search-hotel-map.component';
import { EntertainmentsComponent } from './components/entertainments/entertainments.component';
import { SearchEntertainmentComponent } from './components/search-entertainment/search-entertainment.component';
import { EntertainmentDetailComponent } from './components/entertainment-detail/entertainment-detail.component';
import { OrderEntertainmentComponent } from './components/order-entertainment/order-entertainment.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { PromoComponent } from './components/promo/promo.component';
import { PromoDetailComponent } from './components/promo-detail/promo-detail.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { ManageComponent } from './components/manage/manage.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ManageFlightComponent } from './components/manage-flight/manage-flight.component';
import { ManageTrainComponent } from './components/manage-train/manage-train.component';
import { ManageHotelComponent } from './components/manage-hotel/manage-hotel.component';


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
  },
  {
    path:'searchcar',
    component: SearchCarComponent,
  },
  {
    path:'cardetailpage',
    component: CarDetailComponent,
  },
  {
    path:'hotelsearchmap',
    component: SearchHotelMapComponent,
  },
  {
    path:'entertainments',
    component: EntertainmentsComponent,
  },
  {
    path:'searchentertainment',
    component: SearchEntertainmentComponent,
  },
  {
    path:'entertainmentdetail',
    component: EntertainmentDetailComponent,
  },
  {
    path:'orderentertainment',
    component: OrderEntertainmentComponent,
  },
  {
    path:'blogs',
    component: BlogComponent,
  },
  {
    path:'blogs/:id',
    component: BlogDetailComponent,
  },
  {
    path:'blog-editor',
    component: BlogEditorComponent,
  },
  {
    path:'promos',
    component: PromoComponent,
  },
  {
    path:'promos/:id',
    component: PromoDetailComponent,
  },
  {
    path:'admin/auth',
    component: AdminAuthComponent,
  },
  {
    path:'admin/manage',
    component: ManageComponent,
  },
  {
    path:'admin/manage/event',
    component: ManageEventComponent,
  },
  {
    path:'admin/manage/blog',
    component: ManageBlogComponent,
  },
  {
    path:'admin/manage/flight',
    component: ManageFlightComponent,
  },
  {
    path:'admin/manage/train',
    component: ManageTrainComponent,
  },
  {
    path:'admin/manage/hotel',
    component: ManageHotelComponent,
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
