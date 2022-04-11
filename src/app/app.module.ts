import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSwiperComponent } from './app-swiper/app-swiper.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppSwiperComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    //AppSwiperComponent,
    //NavComponent,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
