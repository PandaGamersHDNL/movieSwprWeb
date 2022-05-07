import { Pipe, PipeTransform } from '@angular/core';
import { TvInfo } from './app-swiper/app-swiper.component';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: TvInfo, ...args: unknown[]): String {
    if(value.title) {
      return value.title
    } else{
      return "Loading..."
    }
  }

}
