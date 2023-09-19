import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherMainComponent } from './teacher-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {TeacherInfoComponent} from "./teacher-info/teacher-info.component";
import {StudentGradeComponent} from "../student/student-grade/student-grade.component";
import {TeacherGradesComponent} from "./teacher-grades/teacher-grades.component";

const routes: Routes = [
  {
    path: '',
    component: TeacherMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id',
        component: TeacherInfoComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id/grades',
        component: TeacherGradesComponent,
        resolve: {
          userInfo: UserBasicDataResolver
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
