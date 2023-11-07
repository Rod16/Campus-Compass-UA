import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationWrapperComponent } from '../../shared/components/navigation-wrapper/navigation-wrapper.component';
import {StudentGradeComponent} from "./student-grade/student-grade.component";
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {HomeComponent} from "../../shared/components/home/home.component";
import {StudentGradeResolver} from "./resolvers/student-grade.resolver";
import {UserInfoComponent} from "../../shared/components/user-info/user-info.component";
import {ParentDataResolver} from "../../shared/resolvers/parent-data.resolver";
import {INavigationData} from "../../shared/interfaces/navigation-data";

const NAVIGATION_DATA: INavigationData[] = [
  {
    title: 'Головна',
    icon: 'home-outline',
    link: './info'
  },
  {
    title: 'Поточна успішність',
    icon: 'star-outline',
    link: 'grades'
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
        path: 'grades',
        component: StudentGradeComponent,
        resolve: {
          studentGrades: StudentGradeResolver
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
