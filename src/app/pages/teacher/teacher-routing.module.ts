import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherMainComponent } from './teacher-main.component';
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {TeacherInfoComponent} from "./teacher-info/teacher-info.component";
import {TeacherGradesComponent} from "./teacher-grades/teacher-grades.component";
import {StudentGradeResolver} from "./resolvers/student-grade.resolver";
import {SetGradeComponent} from "./set-grade/set-grade.component";
import {GroupStudentsResolver} from "./resolvers/group-students.resolver";
import {GroupStudentsComponent} from "./group-students/group-students.component";
import {StudentListResolver} from "./resolvers/student-list.resolver";

const routes: Routes = [
  {
    path: '',
    component: TeacherMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id/grades/:subject/student/:studentId',
        component: SetGradeComponent,
        resolve: {
          userInfo: UserBasicDataResolver,
          studentGrade: StudentGradeResolver
        },
      },
      {
        path: ':id/grades/:subject/:group',
        component: GroupStudentsComponent,
        resolve: {
          userInfo: UserBasicDataResolver,
          groupStudents: GroupStudentsResolver
        },
      },
      {
        path: ':id/grades',
        component: TeacherGradesComponent,
        resolve: {
          studentData: StudentListResolver,
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