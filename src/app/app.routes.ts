import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {GetPaymentsComponent} from "./payment/get-payments/get-payments.component";

export const ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'accounts/:iban', component: GetPaymentsComponent},
  {path: '**', redirectTo: ''}
];
