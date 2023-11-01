import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {TeacherService} from "../services/teacher.service";
import {ISubjectStudentsList} from "../interfaces/teacher-data";
import {StudentService} from "../../student/services/student.service";
import {BaseComponent} from "../../../shared/components/base.component";
import {ITeacherGrades} from "../../../shared/interfaces/grade-data";

@Component({
  selector: 'app-student',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss'],
})
export class TeacherGradesComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentData!: ITeacherGrades[];

  constructor(private route: ActivatedRoute, public teacherService: TeacherService, private studentService: StudentService, private fireStore: AngularFirestore) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.studentData = details['studentData'];
    })
  }

}
