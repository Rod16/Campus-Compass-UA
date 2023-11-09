import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeData} from "../../../shared/interfaces/grade-data";
import {BaseComponent} from "../../../shared/components/base.component";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-student',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
})
export class StudentGradeComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentDataArray: IGradeData[] = [];

  constructor(private route: ActivatedRoute, public sharedService: SharedService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.studentDataArray = details['studentGrades'];
      }
    );
  }

}
