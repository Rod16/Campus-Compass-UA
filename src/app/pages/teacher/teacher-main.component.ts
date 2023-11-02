import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../shared/interfaces/user-info";
import {BaseComponent} from "../../shared/components/base.component";

@Component({
  selector: 'app-teacher',
  templateUrl: 'teacher-main.component.html',
  styleUrls: ['teacher-main.component.scss'],
})
export class TeacherMainComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.userInfo = details['userInfo']
    });
  }

}
