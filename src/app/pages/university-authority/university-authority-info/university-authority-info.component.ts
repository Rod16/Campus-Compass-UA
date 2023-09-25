import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {BaseComponent} from "../../../shared/components/base.component";

@Component({
  selector: 'app-authority-info',
  templateUrl: './university-authority-info.component.html',
  styleUrls: ['./university-authority-info.component.scss'],
})
export class UniversityAuthorityInfoComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
    });
  }

  public signOut() {
    this.sharedService.signOut();
  }

}
