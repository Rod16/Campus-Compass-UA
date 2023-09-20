import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeParams} from "../interfaces/grade-params";
import {BaseComponent} from "../../../shared/components/base.component";
import {TeacherService} from "../services/teacher.service";
import {IStudentData} from "../../../shared/interfaces/student-data";

@Component({
  selector: 'app-teacher-info',
  templateUrl: './set-grade.component.html',
  styleUrls: ['./set-grade.component.scss'],
})
export class SetGradeComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  private gradeParams!: IGradeParams;
  public studentData!: IStudentData;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      (details['userInfo'] as QuerySnapshot<IUserInfo>).forEach(doc => {
        this.userInfo = doc.data() as IUserInfo;
      })
      this.gradeParams = {
        ...details['studentGrade'] as IGradeParams,
        university: this.userInfo.university,
      }
      super.unsubscribeOnComponentDestroy(this.teacherService.getGradesDocument(this.gradeParams)).subscribe((doc) => {
        this.studentData = doc.data() as IStudentData;
      })
    });
  }

}
