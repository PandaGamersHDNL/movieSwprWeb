import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSwiperComponent } from './app-swiper/app-swiper.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [{path: "", component: AppSwiperComponent}, {path: "watch", component: WatchComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
