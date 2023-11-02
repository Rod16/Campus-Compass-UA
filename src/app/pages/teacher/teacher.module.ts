import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TeacherMainComponent } from './teacher-main.component';

import {TeacherRoutingModule} from './teacher-routing.module';
import {TeacherInfoComponent} from "./teacher-info/teacher-info.component";
import {TeacherGradesComponent} from "./teacher-grades/teacher-grades.component";
import {SetGradeComponent} from "./set-grade/set-grade.component";
import {SharedModule} from "../../shared/shared.module";
import {ViewSubjectsComponent} from "./view-subjects/view-subjects.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeacherRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
  declarations: [TeacherMainComponent, TeacherInfoComponent, TeacherGradesComponent, SetGradeComponent, ViewSubjectsComponent]
})
export class TeacherModule {}
