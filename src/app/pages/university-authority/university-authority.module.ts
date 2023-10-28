import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UniversityAuthorityMainComponent } from './university-authority-main.component';

import {UniversityAuthorityRoutingModule} from './university-authority-routing.module';
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";
import {UniversityAuthorityInfoComponent} from "./university-authority-info/university-authority-info.component";
import {CertificateComponent} from "./create-certificate/certificate/certificate.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {SharedModule} from "../../shared/shared.module";
import {CreateSubjectComponent} from "./create-subject/create-subject.component";
import {IonicSelectableComponent} from "ionic-selectable";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniversityAuthorityRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    IonicSelectableComponent
  ],
  declarations: [UniversityAuthorityMainComponent, CreateCertificateComponent, UniversityAuthorityInfoComponent, CertificateComponent, EditUserComponent, UsersListComponent, CreateSubjectComponent]
})
export class UniversityAuthorityModule {}
