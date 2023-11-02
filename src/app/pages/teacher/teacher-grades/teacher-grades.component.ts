import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
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

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.studentData = details['studentData'];
    })
  }

}
