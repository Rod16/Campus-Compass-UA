import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {IUserInfo} from "../../shared/interfaces/user-info";

@Component({
  selector: 'app-authority-main',
  templateUrl: 'university-authority-main.component.html',
  styleUrls: ['university-authority-main.component.scss'],
})
export class UniversityAuthorityMainComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
    });
  }

}
