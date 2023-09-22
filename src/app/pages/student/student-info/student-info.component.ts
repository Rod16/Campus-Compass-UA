import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-student',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
    this.route.data.subscribe((details: Data) => {
      (details['userInfo'] as QuerySnapshot<IUserInfo>).forEach(doc => {
        this.userInfo = doc.data() as IUserInfo;
      })
    });
  }

  public signOut() {
    this.sharedService.signOut();
  }

}
