import {Component} from '@angular/core';
import {BaseComponent} from "../base.component";
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../interfaces/user-info";
import {UserRole} from "../../enums/user-role";

@Component({
  selector: 'app-user-info',
  templateUrl: 'user-info.component.html',
})
export class UserInfoComponent extends BaseComponent {
  public userInfo!: IUserInfo;
  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details: Data) => {
      this.userInfo = details['userInfo'];
    });
  }

  protected readonly UserRole = UserRole;
}
