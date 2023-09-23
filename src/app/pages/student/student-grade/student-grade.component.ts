import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {StudentService} from "../services/student.service";
import {IGradeData} from "../../../shared/interfaces/grade-data";
import {BaseComponent} from "../../../shared/components/base.component";

@Component({
  selector: 'app-student',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
})
export class StudentGradeComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentDataArray: IGradeData[] = [];

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.studentDataArray = details['studentGrades'];
      }
    );
  }

}
