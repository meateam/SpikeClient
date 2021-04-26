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
    root.style.setProperty('--sort-background-color', `var(--sort-${color}-background-color)`);
    root.style.setProperty('--input-underline-color', `var(--input-${color}-underline-color`);
    root.style.setProperty('--select-background-color',  `var(--select-${color}-background-color)`);
    root.style.setProperty('--select-color',  `var(--select-${color}-color)`);
    root.style.setProperty('--select-active-background-color',  `var(--select-active-${color}-background-color)`);
    root.style.setProperty('--select-active-color',  `var(--select-active-${color}-color)`);
    root.style.setProperty('--mat-divider-color', `var(--mat-divider-${color}-color)`);
    root.style.setProperty('--list-header-background-color', `var(--list-header-${color}-background-color)`);
    root.style.setProperty('--disabled-color', `var(--disabled-${color}-color)`);
    root.style.setProperty('--hover-background-color', `var(--hover-${color}-background-color)`);
  }
}
