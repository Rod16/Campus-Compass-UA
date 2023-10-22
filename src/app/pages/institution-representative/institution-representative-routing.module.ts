import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionRepresentativeMainComponent } from './institution-representative-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {ViewCertificateComponent} from "./view-certificate/view-certificate.component";
import {TeacherInfoComponent} from "../teacher/teacher-info/teacher-info.component";
import {InstitutionRepresentativeInfoComponent} from "./university-authority-info/institution-representative-info.component";

const routes: Routes = [
  {
    path: '',
    component: InstitutionRepresentativeMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id/view-certificate',
        component: ViewCertificateComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id',
        component: InstitutionRepresentativeInfoComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRepresentativeRoutingModule {}
