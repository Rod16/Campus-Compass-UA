import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {BaseComponent} from "../../../shared/components/base.component";
import {ISubjectData} from "../../../shared/interfaces/grade-data";
import {FormControl, UntypedFormBuilder} from "@angular/forms";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-student',
  templateUrl: './view-subjects.component.html',
})
export class ViewSubjectsComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public subjectArray!: ISubjectData[];
  public subjectsFormControlArray: FormControl[] = [];
  public chosenSubject!: ISubjectData;
  public subjectIndex!: number;
  public isModalOpen = false;

  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder, private teacherService: TeacherService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.subjectArray = details['subjects'];
    })
  }

  toggleModal(subject: ISubjectData, i: number) {
    this.chosenSubject = subject;
    this.subjectIndex = i;
    this.subjectsFormControlArray = [this.fb.control('')];
    this.isModalOpen = !this.isModalOpen;
  }

  addNewField() {
    this.subjectsFormControlArray.push(this.fb.control(''));
  }

  saveFields() {
    const addedFields = this.subjectsFormControlArray.map((control) => {
      return {
        mark: 0,
        title: control.value,
        teacher: this.chosenSubject.teacher.name,
      }
    });
    for (let i = 0; i < this.chosenSubject.gradesArray.length; i++) {
      this.chosenSubject.gradesArray[i].grades.push(...addedFields);
    }
    this.subjectArray[this.subjectIndex] = this.chosenSubject;
    this.teacherService.updateSubjectsData(this.chosenSubject);
    this.toggleModal(this.chosenSubject, this.subjectIndex);
  }
}
