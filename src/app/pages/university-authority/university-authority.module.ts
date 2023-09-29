import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UniversityAuthorityMainComponent } from './university-authority-main.component';

import {UniversityAuthorityRoutingModule} from './university-authority-routing.module';
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";
import {UniversityAuthorityInfoComponent} from "./university-authority-info/university-authority-info.component";
import {CertificateComponent} from "./create-certificate/certificate/certificate.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UniversityAuthorityRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UniversityAuthorityMainComponent, CreateCertificateComponent, UniversityAuthorityInfoComponent, CertificateComponent]
})
export class UniversityAuthorityModule {}
