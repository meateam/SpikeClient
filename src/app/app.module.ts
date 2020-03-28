// app.module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { AvatarModule } from 'ng2-avatar';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared-module';
import { AppRoutingModule } from './app-routing.module';
import { AvatarModule } from 'ngx-avatar';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterClientModalComponent } from './auth/register-client-modal/register-client-modal.component';
import { VerifyClientResetModalComponent } from './clients/verify-client-reset-modal/verify-client-reset-modal.component';
import { VerifyClientDeleteModalComponent } from './clients/verify-client-delete-modal/verify-client-delete-modal.component';
import { ClientHostUrisModalComponent } from './clients/client-host-uris-modal/client-host-uris-modal.component';
import { AuthService } from './auth/auth.service';
import { ClientsService } from './clients/clients.service';
import { TeamsComponent } from './teams/teams.component';
import { NewTeamModalComponent } from './teams/new-team-modal/new-team-modal.component';
import { TeamManagementModalComponent } from './teams/team-management-modal/team-management-modal.component';
import { TeamsService } from './teams/teams.service';
import { TeamAddPersonModalComponent } from './teams/team-management-modal/team-add-person-modal/team-add-person-modal.component';
import { TeamJoinInfoModalComponent } from './teams/team-join-info-modal/team-join-info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    PageNotFoundComponent,
    SidenavComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterClientModalComponent,
    VerifyClientResetModalComponent,
    VerifyClientDeleteModalComponent,
    ClientHostUrisModalComponent,
    TeamsComponent,
    NewTeamModalComponent,
    TeamManagementModalComponent,
    TeamAddPersonModalComponent,
    TeamJoinInfoModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AvatarModule,
  ],
  entryComponents: [RegisterClientModalComponent, VerifyClientDeleteModalComponent,
                    VerifyClientResetModalComponent, ClientHostUrisModalComponent,
                    TeamManagementModalComponent, NewTeamModalComponent, TeamAddPersonModalComponent,
                    TeamJoinInfoModalComponent],
  providers: [FormBuilder, AuthService, ClientsService, SidenavComponent, TeamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
