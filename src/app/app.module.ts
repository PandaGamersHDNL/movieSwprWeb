import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppSwiperComponent } from './app-swiper/app-swiper.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsComponent } from './buttons/buttons.component';
import { WatchComponent } from './watch/watch.component';
import { DisplayInfoComponent } from './display-info/display-info.component';
import { InfoDetailsComponent } from './info-details/info-details.component';

@NgModule({
	declarations: [
		AppComponent,
		AppSwiperComponent,
		NavComponent,
		ButtonsComponent,
  WatchComponent,
  DisplayInfoComponent,
  InfoDetailsComponent,
	],
	imports: [
		BrowserModule,
		MatButtonModule,
		MatIconModule,
		//AppSwiperComponent,
		//NavComponent,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
