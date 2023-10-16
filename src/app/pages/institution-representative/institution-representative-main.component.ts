import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../shared/interfaces/user-info";

@Component({
  selector: 'app-institution-main',
  templateUrl: 'institution-representative-main.component.html',
  styleUrls: ['institution-representative-main.component.scss'],
})
export class InstitutionRepresentativeMainComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
    });
  }

}
