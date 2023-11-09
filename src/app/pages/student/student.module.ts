import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import {StudentRoutingModule} from './student-routing.module';
import {StudentGradeComponent} from "./student-grade/student-grade.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentRoutingModule,
    SharedModule
  ],
  declarations: [StudentGradeComponent]
})
export class StudentModule {}
