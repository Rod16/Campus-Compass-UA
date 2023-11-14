import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UniversityAuthorityRoutingModule} from './university-authority-routing.module';
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";
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
  declarations: [CreateCertificateComponent, CertificateComponent, EditUserComponent, UsersListComponent, CreateSubjectComponent]
})
export class UniversityAuthorityModule {}
