// app-routing.module

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterTeamComponent } from './teams/register-team/register-team.component';
import { ClientsComponent } from './clients/clients.component';
import { TeamsComponent } from './teams/teams.component';
import { ScopesComponent } from './scopes/scopes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
    { path: 'clients', component: ClientsComponent },
    environment.production ? { path: 'teams', component: TeamsComponent } : { path: 'teams', redirectTo: '/dashboard' },
    { path: 'scopes', component: ScopesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '',
      redirectTo: '/register',
      pathMatch: 'full'
    },
    { path: 'register', component: RegisterTeamComponent },
    { path: '**', component: PageNotFoundComponent}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
