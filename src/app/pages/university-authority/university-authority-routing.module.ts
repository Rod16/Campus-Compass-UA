import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityAuthorityMainComponent } from './university-authority-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";
import {UniversityAuthorityInfoComponent} from "./university-authority-info/university-authority-info.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {UserEditDataResolver} from "./resolvers/user-edit-data-resolver";
import {UserInfoComponent} from "../../shared/components/user-info/user-info.component";
import {StudentGradeResolver} from "../teacher/resolvers/student-grade.resolver";

const routes: Routes = [
  {
    path: '',
    component: UniversityAuthorityMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id/view-certificate',
        component: CreateCertificateComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id/users',
        component: UsersListComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id/edit-user/:user-uid',
        component: EditUserComponent,
        data: {
          action: 'edit'
        },
        resolve: {
          userInfo: UserEditDataResolver
        },
      },
      {
        path: ':id/create-user',
        component: EditUserComponent,
        data: {
          action: 'create'
        },
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id/account',
        component: UserInfoComponent,
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
