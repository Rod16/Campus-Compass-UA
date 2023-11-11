import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {ViewCertificateComponent} from "./view-certificate/view-certificate.component";
import {UserInfoComponent} from "../../shared/components/user-info/user-info.component";
import {INavigationData} from "../../shared/interfaces/navigation-data";
import {NavigationWrapperComponent} from "../../shared/components/navigation-wrapper/navigation-wrapper.component";
import {HomeComponent} from "../../shared/components/home/home.component";
import {ParentDataResolver} from "../../shared/resolvers/parent-data.resolver";

const NAVIGATION_DATA: INavigationData[] = [
  {
    title: 'Головна',
    icon: 'home-outline',
    link: 'home'
  },
  {
    title: 'Перегляд документів',
    icon: 'folder-outline',
    link: 'view-certificate'
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
        path: 'account',
        component: UserInfoComponent,
        resolve: {
          userInfo: ParentDataResolver
        },
      },
      {
        path: 'view-certificate',
        component: ViewCertificateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRepresentativeRoutingModule {}
