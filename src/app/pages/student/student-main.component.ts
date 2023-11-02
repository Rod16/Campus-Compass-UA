import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../shared/interfaces/user-info";
import {BaseComponent} from "../../shared/components/base.component";

@Component({
  selector: 'app-student',
  templateUrl: 'student-main.component.html',
  styleUrls: ['student-main.component.scss'],
})
export class StudentMainComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
    });
  }

}
