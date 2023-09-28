import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {UniversityAuthorityService} from "../services/university-authority.service";
import {switchMap} from "rxjs";
import {BaseComponent} from "../../../shared/components/base.component";
import {UntypedFormBuilder} from "@angular/forms";

enum Role {
  Student = 'student',
  Teacher = 'teacher',
}

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss'],
})
export class CreateCertificateComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public selectedRole: Role = Role.Student;
  public studentArray: IUserInfo[] = [];
  public teacherArray: IUserInfo[] = [];
  public certificateForm = this.fb.group({
    student: [''],
    teacher: [''],
  });
  public Role = Role;
  public isStudentModalOpen = false;
  public isTeacherModalOpen = false;
  public id!: string;

  constructor(private route: ActivatedRoute, public sharedService: SharedService, public universityAuthorityService: UniversityAuthorityService, private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).pipe(switchMap((details: Data) => {
      this.userInfo = details['userInfo'];
      return this.universityAuthorityService.getFacultyStudents(this.userInfo.university as string, this.userInfo.faculty as string);
    })).subscribe((student) => {
      this.studentArray.push(student);
    });
  }

  public segmentChanged(e: any) {
    this.selectedRole = e.detail.value;
    if (this.selectedRole === Role.Teacher && this.teacherArray.length === 0) {
      super.unsubscribeOnComponentDestroy(this.universityAuthorityService.getTeachers(this.userInfo.university as string)).subscribe((teacher) => {
        this.teacherArray.push(teacher);
      });
    }
  }

  public toggleStudentModal() {
    this.isStudentModalOpen = !this.isStudentModalOpen;
    if (this.isStudentModalOpen) {
      this.generateId();
    }
  }

  public toggleTeacherModal() {
    this.isTeacherModalOpen = !this.isTeacherModalOpen;
    if (this.isTeacherModalOpen) {
      this.generateId();
    }
  }

  generateId() {
    this.sharedService.generateRandomId();
    this.id = this.sharedService.id;
  }

  saveStudentCertificate() {
    this.universityAuthorityService.saveCertificate(this.id, this.universityAuthorityService.generateStudentCertificate(this.certificateForm.get('student')?.value, this.id), this.certificateForm.get('student')?.value.name)
    this.toggleStudentModal();
  }

  saveTeacherCertificate() {
    this.universityAuthorityService.saveCertificate(this.id, this.universityAuthorityService.generateTeacherCertificate(this.certificateForm.get('teacher')?.value, this.id), this.certificateForm.get('teacher')?.value.name)
    this.toggleTeacherModal();
  }
}
