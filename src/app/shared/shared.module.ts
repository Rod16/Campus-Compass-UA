import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {AuthorisationModule} from "./components/authorisation/authorisation.module";
import {UserInfoComponent} from "./components/user-info/user-info.component";
import {NavigationWrapperComponent} from "./components/navigation-wrapper/navigation-wrapper.component";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AuthorisationModule,
    RouterModule
  ],
  declarations: [UserInfoComponent, NavigationWrapperComponent],
  exports: [AuthorisationModule]
})
export class SharedModule {}
