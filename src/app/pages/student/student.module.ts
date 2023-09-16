import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StudentMainComponent } from './student-main.component';

import {StudentRoutingModule} from './student-routing.module';
import {StudentGradeComponent} from "./student-grade/student-grade.component";
import {StudentInfoComponent} from "./student-info/student-info.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentRoutingModule
  ],
  declarations: [StudentMainComponent, StudentGradeComponent, StudentInfoComponent]
})
export class StudentModule {}
