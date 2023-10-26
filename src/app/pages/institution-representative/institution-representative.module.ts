import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InstitutionRepresentativeMainComponent } from './institution-representative-main.component';

import {InstitutionRepresentativeRoutingModule} from './institution-representative-routing.module';
import {ViewCertificateComponent} from "./view-certificate/view-certificate.component";
import {InstitutionRepresentativeInfoComponent} from "./university-authority-info/institution-representative-info.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InstitutionRepresentativeRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
  declarations: [InstitutionRepresentativeMainComponent, ViewCertificateComponent, InstitutionRepresentativeInfoComponent]
})
export class InstitutionRepresentativeModule {}
