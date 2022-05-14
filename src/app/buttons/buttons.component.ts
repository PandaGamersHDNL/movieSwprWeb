import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<EventButtons>();
  @Input() bEnabled: boolean = true
  @Input() toHighlight: EventButtons = EventButtons.no; //no is never highlighted
  public btns = EventButtons ;
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

  highlight(button: EventButtons){
    console.log(button);
    if(this.toHighlight === button && button != EventButtons.no) {

      return "accent"
    } else {
      return "primary"
    }
  }
}

export enum EventButtons {
  no,
  seen,
  favorite,
  watchLater
}
