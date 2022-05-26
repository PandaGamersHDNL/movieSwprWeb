import { Component, OnInit, Input } from '@angular/core';
import { TvInfo } from '../app-swiper/app-swiper.component';

@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.css']
})
export class DisplayInfoComponent implements OnInit {
  @Input() tvInfo: TvInfo = {};
  constructor() { }

  ngOnInit(): void {
  }

  public valTitle() {
    return this.tvInfo.title ? true : false;
  }
  public valRuntime() {
    return this.tvInfo.runtimeStr ? true : false;
  }
  public valYear() {
    return this.tvInfo.year ? true : false;
  }
  public valPlot() {
    return this.tvInfo.plot ? true : false;
  }

  public valImdbRating() {
    return this.tvInfo.imDbRating ? true : false;
  }

  public valContentRating() {
    return this.tvInfo.contentRating ? true : false;
  }
  public valTagline(){
    return this.tvInfo.tagline ? true : false;
  }
  public valGenres(){
    return this.tvInfo.genres ? true : false;
  }
  public valLanguage(){
    return this.tvInfo.languages!.length > 0 ? true : false;
  }
}
