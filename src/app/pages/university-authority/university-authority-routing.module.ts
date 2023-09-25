import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityAuthorityMainComponent } from './university-authority-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";
import {TeacherInfoComponent} from "../teacher/teacher-info/teacher-info.component";
import {UniversityAuthorityInfoComponent} from "./university-authority-info/university-authority-info.component";

const routes: Routes = [
  {
    path: '',
    component: UniversityAuthorityMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id/create-certificate',
        component: CreateCertificateComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id',
        component: UniversityAuthorityInfoComponent,
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
export class UniversityAuthorityRoutingModule {}
