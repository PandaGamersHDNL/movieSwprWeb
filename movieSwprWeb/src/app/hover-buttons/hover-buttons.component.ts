import { Component, OnInit } from '@angular/core';
import { BaseButtons } from '../buttons/buttons.component';

@Component({
  selector: 'app-hover-buttons',
  templateUrl: './hover-buttons.component.html',
  styleUrls: ['./hover-buttons.component.css']
})
export class HoverButtonsComponent extends BaseButtons implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
