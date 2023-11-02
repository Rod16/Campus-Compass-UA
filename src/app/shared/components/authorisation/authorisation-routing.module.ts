import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisationComponent } from './authorisation.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
