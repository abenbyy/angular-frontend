import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';


import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/login/login-modal.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';

import { GraphQLModule } from './graphql.module';

import { HttpClientModule } from '@angular/common/http';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi"; 

import { GoogleLoginService } from './services/google-login.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchTrainComponent } from './components/search-train/search-train.component';
import { HomepageSliderComponent } from './components/homepage-slider/homepage-slider.component';
import { ChangeSearchWidgetComponent } from './components/change-search-widget/change-search-widget.component';
import { SearchHotelComponent } from './components/search-hotel/search-hotel.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { NearestHotelComponent } from './components/nearest-hotel/nearest-hotel.component';
import { HotelImageSliderComponent } from './components/hotel-image-slider/hotel-image-slider.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SearchHotelMapComponent } from './components/search-hotel-map/search-hotel-map.component';
import { EntertainmentsComponent } from './components/entertainments/entertainments.component';
import { SearchEntertainmentComponent } from './components/search-entertainment/search-entertainment.component';
import { EntertainmentDetailComponent } from './components/entertainment-detail/entertainment-detail.component';
import { OrderEntertainmentComponent } from './components/order-entertainment/order-entertainment.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { HistoryComponent } from './components/history/history.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { PromoComponent } from './components/promo/promo.component';
import { PromoDetailComponent } from './components/promo-detail/promo-detail.component';
import { AdminAuthComponent }from './components/admin-auth/admin-auth.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { ManageComponent } from './components/manage/manage.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ManageFlightComponent } from './components/manage-flight/manage-flight.component';
import { ManageHotelComponent } from './components/manage-hotel/manage-hotel.component';
import { ManageTrainComponent } from './components/manage-train/manage-train.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { OrderComponent } from './components/order/order.component';
import { TrainEditorComponent } from './components/train-editor/train-editor.component';
import { HotelEditorComponent } from './components/hotel-editor/hotel-editor.component';
import { FlightEditorComponent } from './components/flight-editor/flight-editor.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';



let GOOGLEAUTH_ID:string = "385839845308-kc4slf9ji1rufjj36bf246l4rhjfm9n7.apps.googleusercontent.com";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: GOOGLEAUTH_ID,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "redirect",
  redirect_uri: "http://localhost:4200",
  scope: [
      "https://www.googleapis.com/auth/userinfo.profile"
  ].join(" ")
};

const modules =[
  A11yModule,
CdkStepperModule,
CdkTableModule,
CdkTreeModule,
DragDropModule,
MatAutocompleteModule,
MatBadgeModule,
MatBottomSheetModule,
MatButtonModule,
MatButtonToggleModule,
MatCardModule,
MatCheckboxModule,
MatChipsModule,
MatStepperModule,
MatDatepickerModule,
MatDialogModule,
MatDividerModule,
MatExpansionModule,
MatFormFieldModule,
MatGridListModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatNativeDateModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRadioModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatTableModule,
MatTabsModule,
MatToolbarModule,
MatTooltipModule,
MatTreeModule,
PortalModule,
ScrollingModule,
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoginModalComponent,
    QuickSearchComponent,
    FooterComponent,
    ProfileComponent,
    SearchResultComponent,
    SearchHotelComponent,
    SearchTrainComponent,
    HomepageSliderComponent,
    ChangeSearchWidgetComponent,
    HotelDetailComponent,
    NearestHotelComponent,
    HotelImageSliderComponent,
    SearchCarComponent,
    CarDetailComponent,
    SearchHotelMapComponent,
    EntertainmentsComponent,
    SearchEntertainmentComponent,
    EntertainmentDetailComponent,
    OrderEntertainmentComponent,
    BlogComponent,
    BlogDetailComponent,
    BlogEditorComponent,
    TrainEditorComponent,
    HotelEditorComponent,
    FlightEditorComponent,
    EventEditorComponent,
    HistoryComponent,
    OrderComponent,
    PromoComponent,
    PromoDetailComponent,
    DeletePopupComponent,
    AdminAuthComponent,
    ManageComponent,
    ManageEventComponent,
    ManageBlogComponent,
    ManageFlightComponent,
    ManageHotelComponent,
    ManageTrainComponent,
    ChatComponent,
    ChatDetailComponent,
    
    
  ],
  entryComponents:[
    LoginModalComponent,
    ChangeSearchWidgetComponent,
    HotelImageSliderComponent,
    HistoryComponent,
    DeletePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    modules,
    ReactiveFormsModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    
    
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  
  ],
  bootstrap: [AppComponent],
  exports:[
    GoogleApiModule,
    modules
  ]
})
export class AppModule { }
