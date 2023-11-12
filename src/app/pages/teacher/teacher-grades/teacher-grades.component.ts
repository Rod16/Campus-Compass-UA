import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {BaseComponent} from "../../../shared/components/base.component";
import {ITeacherGrades} from "../../../shared/interfaces/grade-data";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-student',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss'],
})
export class TeacherGradesComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentData!: ITeacherGrades[];
  public chosenStudent!: IUserInfo | null;

  constructor(private route: ActivatedRoute, public sharedService: SharedService, private router: Router) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.studentData = details['studentData'];
    })
  }

  navigateToSetGrade(subject: string) {
    this.router.navigate([subject + '/student/' + this.chosenStudent?.uid], {relativeTo: this.route})
    this.chosenStudent = null;
  }

}
