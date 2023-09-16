import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentMainComponent } from './student-main.component';
import {StudentGradeComponent} from "./student-grade/student-grade.component";
import {UserBasicDataResolver} from "../../shared/resolvers/user-basic-data.resolver";
import {StudentInfoComponent} from "./student-info/student-info.component";

const routes: Routes = [
  {
    path: '',
    component: StudentMainComponent,
    resolve: {
      userInfo: UserBasicDataResolver
    },
    children: [
      {
        path: ':id',
        component: StudentInfoComponent,
        resolve: {
          userInfo: UserBasicDataResolver
        },
      },
      {
        path: ':id/grades',
        component: StudentGradeComponent,
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
export class StudentRoutingModule {}
