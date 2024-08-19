import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChagnePasswordComponent } from '../components/settings/chagne-password/chagne-password.component';
import { ResetPasswordComponent } from '../components/settings/reset-password/reset-password.component';

const routes: Routes = [
  {path : '' , redirectTo : 'home' , pathMatch : 'full'} ,
  {path : 'chagne'  , component  :ChagnePasswordComponent},
  {path : 'reset'  , component  : ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
