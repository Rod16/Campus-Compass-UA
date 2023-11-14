import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {CreateCertificateComponent} from "./create-certificate/create-certificate.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {UserEditDataResolver} from "./resolvers/user-edit-data-resolver";
import {UserInfoComponent} from "../../shared/components/user-info/user-info.component";
import {CreateSubjectComponent} from "./create-subject/create-subject.component";
import {NavigationWrapperComponent} from "../../shared/components/navigation-wrapper/navigation-wrapper.component";
import {ParentDataResolver} from "../../shared/resolvers/parent-data.resolver";
import {HomeComponent} from "../../shared/components/home/home.component";
import {INavigationData} from "../../shared/interfaces/navigation-data";

const NAVIGATION_DATA: INavigationData[] = [
  {
    title: 'Головна',
    icon: 'home-outline',
    link: 'home'
  },
  {
    title: 'Створення довідок',
    icon: 'id-card-outline',
    link: 'create-certificate'
  },
  {
    title: 'Перегляд користувачів',
    icon: 'people-outline',
    link: 'users'
  },
  {
    title: 'Створення навчальної дисципліни',
    icon: 'library-outline',
    link: 'create-subject'
  },
  {
    title: 'Створення нового користувача',
    icon: 'person-add-outline',
    link: 'create-user'
  },
  {
    title: 'Інформація про користувача',
    icon: 'person-circle-outline',
    link: 'account'
  }
]

const routes: Routes = [
  {
    path: ':id',
    component: NavigationWrapperComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    data: {
      navigation: NAVIGATION_DATA
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: "full"
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          userInfo: ParentDataResolver
        },
        data: {
          navigation: NAVIGATION_DATA
        },
      },
      {
        path: 'create-certificate',
        component: CreateCertificateComponent,
        resolve: {
          userInfo: ParentDataResolver
        },
      },
      {
        path: 'users',
        component: UsersListComponent,
        resolve: {
          userInfo: ParentDataResolver
        },
      },
      {
        path: 'create-subject',
        component: CreateSubjectComponent,
        resolve: {
          userInfo: ParentDataResolver
        },
      },
      {
        path: 'edit-user/:user-uid',
        component: EditUserComponent,
        data: {
          action: 'edit'
        },
        resolve: {
          userInfo: UserEditDataResolver
        },
      },
      {
        path: 'create-user',
        component: EditUserComponent,
        data: {
          action: 'create'
        },
        resolve: {
          userInfo: ParentDataResolver
        },
      },
      {
        path: 'account',
        component: UserInfoComponent,
        resolve: {
          userInfo: ParentDataResolver
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityAuthorityRoutingModule {}
