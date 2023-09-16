import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../shared/interfaces/user-info";

@Component({
  selector: 'app-student',
  templateUrl: 'student-main.component.html',
  styleUrls: ['student-main.component.scss'],
})
export class StudentMainComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((details: Data) => {
      (details['userInfo'] as QuerySnapshot<IUserInfo>).forEach(doc => {
        this.userInfo = doc.data() as IUserInfo;
      })
    });
  }

}
