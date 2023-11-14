import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {TeacherGradesComponent} from "./teacher-grades/teacher-grades.component";
import {StudentGradeResolver} from "./resolvers/student-grade.resolver";
import {SetGradeComponent} from "./set-grade/set-grade.component";
import {StudentListResolver} from "./resolvers/student-list.resolver";
import {UserInfoComponent} from "../../shared/components/user-info/user-info.component";
import {ViewSubjectsComponent} from "./view-subjects/view-subjects.component";
import {SubjectsResolver} from "./resolvers/subjects.resolver";
import {NavigationWrapperComponent} from "../../shared/components/navigation-wrapper/navigation-wrapper.component";
import {HomeComponent} from "../../shared/components/home/home.component";
import {ParentDataResolver} from "../../shared/resolvers/parent-data.resolver";
import {INavigationData} from "../../shared/interfaces/navigation-data";

const NAVIGATION_DATA: INavigationData[] = [
  {
    title: 'Головна',
    icon: 'home-outline',
    link: 'home'
  },
  {
    title: 'Перегляд поточних дисциплін',
    icon: 'library-outline',
    link: 'view-subjects'
  },
  {
    title: 'Виставлення оцінок',
    icon: 'pencil-outline',
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
        path: 'grades/:subject/student/:studentId',
        component: SetGradeComponent,
        resolve: {
          studentGrade: StudentGradeResolver
        },
      },
      {
        path: 'view-subjects',
        component: ViewSubjectsComponent,
        resolve: {
          subjects: SubjectsResolver,
        },
      },
      {
        path: 'grades',
        component: TeacherGradesComponent,
        resolve: {
          studentData: StudentListResolver,
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
export class TeacherRoutingModule {}
