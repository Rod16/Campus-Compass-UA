import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthorisationComponent } from './authorisation.component';

import { HomePageRoutingModule } from './authorisation-routing.module';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../../../../environments/environment";
import {EntryFieldsModule} from "../../entry-fields/entry-fields.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    EntryFieldsModule,
  ],
  providers: [AngularFireAuthModule],
  declarations: [AuthorisationComponent]
})
export class AuthorisationModule {}
