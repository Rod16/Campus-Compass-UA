import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {BaseComponent} from "../../../shared/components/base.component";

@Component({
  selector: 'app-institution-representative-info',
  templateUrl: './institution-representative-info.component.html',
  styleUrls: ['./institution-representative-info.component.scss'],
})
export class InstitutionRepresentativeInfoComponent extends BaseComponent implements OnInit {
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
