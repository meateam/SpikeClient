import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatDividerModule, MatIconModule,
        MatSnackBarModule, MatTooltipModule, MatDialogModule, MatProgressSpinnerModule, MatSidenavModule, MatCheckboxModule,
        MatListModule, 
        MatExpansionModule} from '@angular/material';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TokensComponent } from './tokens/tokens.component';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tokens', component: TokensComponent },
  { path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoginComponent,
    SidenavComponent,
    TokensComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [LoginService, RegisterService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
