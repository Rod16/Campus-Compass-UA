import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TeacherMainComponent } from './teacher-main.component';

import {TeacherRoutingModule} from './teacher-routing.module';
import {TeacherInfoComponent} from "./teacher-info/teacher-info.component";
import {TeacherGradesComponent} from "./teacher-grades/teacher-grades.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherRoutingModule
  ],
  declarations: [TeacherMainComponent, TeacherInfoComponent, TeacherGradesComponent]
})
export class TeacherModule {}
