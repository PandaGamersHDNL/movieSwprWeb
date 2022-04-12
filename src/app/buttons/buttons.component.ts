import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<EventButtons>();

  constructor() { }

  ngOnInit(): void {
  }

  noClicked() {
    this.buttonClicked.emit(EventButtons.no)
  }

  favClicked() {
    this.buttonClicked.emit(EventButtons.favorite)
  }
  seenClicked() {
    this.buttonClicked.emit(EventButtons.seen)
  }
  watchClicked() {
    this.buttonClicked.emit(EventButtons.watchLater)
  }
}

export enum EventButtons{
  no,
  seen,
  favorite,
  watchLater
}
