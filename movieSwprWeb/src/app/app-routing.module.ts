import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSwiperComponent } from './app-swiper/app-swiper.component';
import { InfoDetailsComponent } from './info-details/info-details.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  {path: "", component: AppSwiperComponent},
  {path: "watch", component: WatchComponent},
  {path: "seen", component: WatchComponent},
  {path: "favorite", component: WatchComponent},
  {path: "details/:from/:id", component: InfoDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
