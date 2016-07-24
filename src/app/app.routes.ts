import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { About } from './app.component';
import { HousesComponent } from './house/houses.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MapComponent } from './map/map.component';
import { LandlordComponent } from './landlord/landlord.component';

export const routes: RouterConfig = [
  { path: '', component: MapComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'landlords/:id', component: LandlordComponent },
  // { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
