import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentMainComponent } from './student-main.component';
import {StudentGradeComponent} from "./student-grade/student-grade.component";
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {StudentInfoComponent} from "./student-info/student-info.component";
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
    component: StudentMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    data: {
      navigation: NAVIGATION_DATA
    },
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: "full"
      },
      {
        path: 'info',
        component: StudentInfoComponent,
        resolve: {
          userInfo: UserBasicDataResolver
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
