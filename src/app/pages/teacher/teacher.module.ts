import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TeacherMainComponent } from './teacher-main.component';

import {TeacherRoutingModule} from './teacher-routing.module';
import {TeacherInfoComponent} from "./teacher-info/teacher-info.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherRoutingModule
  ],
  declarations: [TeacherMainComponent, TeacherInfoComponent]
})
export class TeacherModule {}
