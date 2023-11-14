import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {UniversityAuthorityService} from "../services/university-authority.service";
import {BaseComponent} from "../../../shared/components/base.component";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {switchMap} from "rxjs";
import {ToastTypeEnum} from "../../../shared/enums/toast-type";

@Component({
  selector: 'app-edit-user',
  templateUrl: './create-subject.component.html',
})
export class CreateSubjectComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public teachersArray: IUserInfo[] = [];
  public studentsArray: IUserInfo[] = [];
  public subjectForm = this.fb.group({
    subject: ['', Validators.required],
    teacher: ['', Validators.required],
    students: [''],
    course: ['', Validators.required],
    groups: [''],
  });
  public student!: IUserInfo;

  constructor(private route: ActivatedRoute, public sharedService: SharedService, public universityAuthorityService: UniversityAuthorityService, private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).pipe(switchMap((details: Data) => {
      this.userInfo = details['userInfo'];
      return this.universityAuthorityService.getTeachers(this.userInfo.university as string);
    })).subscribe((usersArray: IUserInfo[]) => {
      this.teachersArray = usersArray;
    });
    super.unsubscribeOnComponentDestroy(this.route.data).pipe(switchMap((details: Data) => {
      this.userInfo = details['userInfo'];
      return this.universityAuthorityService.getFacultyStudents(this.userInfo.university as string, this.userInfo.faculty as string);
    })).subscribe((usersArray: IUserInfo[]) => {
      this.studentsArray = usersArray;
    });
  }

  saveSubject() {
    if (this.subjectForm.get('students')?.value || this.subjectForm.get('groups')?.value) {
      this.universityAuthorityService.addSubject(this.subjectForm.value.subject, this.subjectForm.value.teacher, this.subjectForm.value.course, this.subjectForm.value.students, this.subjectForm.value.groups);
    } else {
      this.sharedService.presentToast('Оберіть студентів або групи', ToastTypeEnum.Error);
    }
  }
}
