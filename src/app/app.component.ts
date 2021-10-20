// app.component

import { Component, OnInit } from '@angular/core';
import { PublicFunctions } from './shared/shared';
import { MatomoInjector, MatomoTracker } from 'ngx-matomo';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SpikeClient';

  constructor(
    private matomoInjector: MatomoInjector, 
    private matomoTracker: MatomoTracker
  ) {
    this.matomoInjector.init(environment.MATOMO_URL, environment.MATOMO_SITE_ID); 
  }

  ngOnInit() {
    PublicFunctions.checkLogin();

    // this.matomoTracker.setUserId('UserId');
    // this.matomoTracker.setDocumentTitle('ngxMatomo Test');
  }


}
