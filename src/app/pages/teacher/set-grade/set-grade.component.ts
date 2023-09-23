import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {BaseComponent} from "../../../shared/components/base.component";
import {FormBuilder, FormControl} from "@angular/forms";
import {IGradeDataExtended} from "../interfaces/grade-data-extended";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-teacher-info',
  templateUrl: './set-grade.component.html',
  styleUrls: ['./set-grade.component.scss'],
})
export class SetGradeComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentData!: IGradeDataExtended;
  public formControlsArray: FormControl[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private teacherService: TeacherService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
      this.studentData = details['studentGrade']
      for (let i = 0; i < this.studentData.gradeData.grades.length; i++) {
        this.formControlsArray.push(this.fb.control(this.studentData.gradeData.grades[i].mark));
      }
    })
  }

  public saveForm() {
    this.studentData.gradeData.grades.forEach((item, index) => {
      item.mark = this.formControlsArray[index].value;
    })
    this.teacherService.updateGradesDocument(this.studentData.gradeData, this.studentData.gradeData.subject, this.studentData.userInfo).then(() => {
      alert('Оцінки успішно збережено');
    })
  }

}
