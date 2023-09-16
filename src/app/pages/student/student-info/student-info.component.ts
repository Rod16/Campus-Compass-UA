import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {UserRole} from "../../../shared/enums/user-role";
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-student',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
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
