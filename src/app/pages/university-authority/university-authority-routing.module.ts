import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityAuthorityMainComponent } from './university-authority-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityAuthorityRoutingModule {}
