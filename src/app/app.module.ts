import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ROUTES} from "./app.routes";

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from "@angular/cdk/layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PreloadAllModules, RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {HttpRequestInterceptor} from "./services/HttpRequestInterceptor";
import {NavbarComponent} from "./navbar/navbar.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {CreateAccountDialogComponent} from "./accounts/create-account-dialog/create-account-dialog.component";
import {CreatePaymentComponent} from "./payment/create-payment/create-payment.component";
import { AddMoneyComponent } from './accounts/add-money/add-money.component';
import {MatDividerModule} from "@angular/material/divider";
import {ErrorDialogComponent} from './util/error-dialog/error-dialog.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AccountsComponent,
    CreateAccountDialogComponent,
    CreatePaymentComponent,
    RegisterComponent,
    AddMoneyComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatOptionModule,
    MatDialogModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ],
})
export class AppModule {
}
