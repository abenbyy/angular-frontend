import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchTrainComponent } from './components/search-train/search-train.component';


const routes: Routes = [
  {
    path:'',
    component: QuickSearchComponent
  },
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
    path:'searchtrip',
    component: SearchTrainComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
