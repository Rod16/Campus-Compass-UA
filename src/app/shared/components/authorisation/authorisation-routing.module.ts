import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisationComponent } from './authorisation.component';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";

const routes: Routes = [
  {
    path: '',
    component: AuthorisationComponent,
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
