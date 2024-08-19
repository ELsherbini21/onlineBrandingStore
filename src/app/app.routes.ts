import { provideZoneChangeDetection } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'home', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', canActivate: [authGuard], component: ProductComponent },
  { path: 'cart', canActivate: [authGuard], component: CartComponent },
  { path: 'checkOut', canActivate: [authGuard], component: CheckOutComponent },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
  },

  {
    path: 'productDetails/:Id',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // route for settings module .
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (mod) => mod.SettingsModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];
