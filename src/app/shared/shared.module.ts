import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {AuthorisationModule} from "./components/authorisation/authorisation.module";
import {UserInfoComponent} from "./components/user-info/user-info.component";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AuthorisationModule
  ],
  declarations: [UserInfoComponent],
  exports: [AuthorisationModule]
})
export class SharedModule {}
