import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {BaseComponent} from "../../../shared/components/base.component";
import {FormBuilder, FormControl} from "@angular/forms";
import {TeacherService} from "../services/teacher.service";
import {IStudentGrade, ISubjectData} from "../../../shared/interfaces/grade-data";
import {SharedService} from "../../../shared/services/shared.service";
import {ToastTypeEnum} from "../../../shared/enums/toast-type";

@Component({
  selector: 'app-teacher-info',
  templateUrl: './set-grade.component.html',
  styleUrls: ['./set-grade.component.scss'],
})
export class SetGradeComponent extends BaseComponent implements OnInit {
  public subjectData!: ISubjectData;
  public formControlsArray: FormControl[] = [];
  public studentId!: string;
  public studentData!: IStudentGrade;
  public studentDataIndex!: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private teacherService: TeacherService, public sharedService: SharedService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.subjectData = details['studentGrade'];
      this.studentId = this.route.snapshot.params['studentId'];
      for (let i = 0; i < this.subjectData.gradesArray.length; i++) {
        if (this.subjectData.gradesArray[i].student.uid === this.studentId) {
          this.studentData = this.subjectData.gradesArray[i];
          this.formControlsArray = this.studentData.grades.map((item) => {
            return this.fb.control(item.mark);
          })
          this.studentDataIndex = i;
          break;
        }
      }
    })
  }

  public saveForm() {
    this.studentData.grades.forEach((item, index) => {
      item.mark = this.formControlsArray[index].value;
    })
    this.subjectData.gradesArray[this.studentDataIndex] = this.studentData;
    this.teacherService.updateGrades(this.subjectData).then(() => {
      this.sharedService.presentToast('Оцінки успішно оновлено', ToastTypeEnum.Success);
    })
  }

}
