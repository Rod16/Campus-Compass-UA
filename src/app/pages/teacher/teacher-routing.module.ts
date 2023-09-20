import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherMainComponent } from './teacher-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {TeacherInfoComponent} from "./teacher-info/teacher-info.component";
import {StudentGradeComponent} from "../student/student-grade/student-grade.component";
import {TeacherGradesComponent} from "./teacher-grades/teacher-grades.component";
import {StudentGradeResolver} from "./resolvers/student-grade.resolver";
import {SetGradeComponent} from "./set-grade/set-grade.component";

const routes: Routes = [
  {
    path: '',
    component: TeacherMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id/grades/:subject/:faculty/:group/:uid',
        component: SetGradeComponent,
        resolve: {
          userInfo: UserBasicDataResolver,
          studentGrade: StudentGradeResolver
        },
      },
      {
        path: ':id/grades',
        component: TeacherGradesComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id',
        component: TeacherInfoComponent,
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
export class TeacherRoutingModule {}
