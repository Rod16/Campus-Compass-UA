import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {BaseComponent} from "../../../shared/components/base.component";
import {IStudentData} from "../../../shared/interfaces/student-data";

@Component({
  selector: 'app-teacher-info',
  templateUrl: './set-grade.component.html',
  styleUrls: ['./set-grade.component.scss'],
})
export class SetGradeComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentData!: IStudentData;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      (details['userInfo'] as QuerySnapshot<IUserInfo>).forEach(doc => {
        this.userInfo = doc.data() as IUserInfo;
      })
      this.studentData = details['studentGrade']
    })
  }

}
