import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {BaseComponent} from "../../../shared/components/base.component";
import {TeacherService} from "../services/teacher.service";
import {IGroupStudents} from "../interfaces/group-students";

@Component({
  selector: 'app-teacher-info',
  templateUrl: './group-students.component.html',
  styleUrls: ['./group-students.component.scss'],
})
export class GroupStudentsComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentData: IUserInfo[] = [];
  public groupId!: string;
  public subject!: string;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService, private router: Router) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      (details['userInfo'] as QuerySnapshot<IUserInfo>).forEach(doc => {
        this.userInfo = doc.data() as IUserInfo;
      })
      this.groupId = (details['groupStudents'] as IGroupStudents).group;
      this.subject = (details['groupStudents'] as IGroupStudents).subject;
      super.unsubscribeOnComponentDestroy(this.teacherService.getStudentsByGroup((details['groupStudents'] as IGroupStudents).group, this.userInfo.university as string)).subscribe((doc) => {
        doc.docs.forEach((item) => {
          this.studentData.push(item.data());
        })
      })
    });
  }
}
