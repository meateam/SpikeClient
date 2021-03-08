// toolbar.component

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() displayLogo;
  @Input() helpButton;
  @Output() iconClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onIconClick() {
    this.iconClick.emit(true);
  }
}
