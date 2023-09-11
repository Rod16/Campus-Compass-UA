import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PasswordFieldComponent} from "./password-field/password-field.component";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    PasswordFieldComponent
  ],
  declarations: [PasswordFieldComponent]
})
export class EntryFieldsModule {}
