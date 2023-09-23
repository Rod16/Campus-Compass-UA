import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UniversityAuthorityMainComponent } from './university-authority-main.component';

import {UniversityAuthorityRoutingModule} from './university-authority-routing.module';
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityAuthorityRoutingModule
  ],
  declarations: [UniversityAuthorityMainComponent, CreateCertificateComponent]
})
export class UniversityAuthorityModule {}
