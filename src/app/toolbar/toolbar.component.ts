// toolbar.component

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() darkTheme: boolean;
  @Input() title: string;
  @Input() icon: string;
  @Input() displayLogo;
  @Input() helpButton;
  @Output() iconClick = new EventEmitter();

  isToggle = false;

  constructor() { }

  ngOnInit() {
  }

  onIconClick() {
    this.iconClick.emit(true);
  }

  toggleTheme() {
    this.isToggle = !this.isToggle;

    const root = document.documentElement;
    const color = this.isToggle ? 'dark' : 'light';
    root.style.setProperty('--toolbar-color', `var(--toolbar-${color}-color)`);
    root.style.setProperty('--sidenav-background-color', `var(--sidenav-${color}-background-color)`);
    root.style.setProperty('--sidenav-color', `var(--sidenav-${color}-color)`);
    root.style.setProperty('--sidenav-btn-active', `var(--sidenav-${color}-btn-active)`);
    root.style.setProperty('--body-background-color', `var(--body-${color}-background-color)`);
    root.style.setProperty('--card-background-color', `var(--card-${color}-background-color)`);
    root.style.setProperty('--card-color', `var(--card-${color}-color)`);
    root.style.setProperty('--card-sub-color', `var(--card-sub-${color}-color)`);
    root.style.setProperty('--textarea-color', `var(--textarea-${color}-color)`);
    root.style.setProperty('--textarea-background-color', `var(--textarea-${color}-background-color)`);
  }
}
