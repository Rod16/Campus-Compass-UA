import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../interfaces/user-info";
import {SharedService} from "../../services/shared.service";
import {BaseComponent} from "../base.component";
import {INavigationData} from "../../interfaces/navigation-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public navigationData!: INavigationData[];

  constructor(private route: ActivatedRoute, public sharedService: SharedService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
      this.navigationData = details['navigation'];
    });
  }

  public signOut() {
    this.sharedService.signOut();
  }

}
