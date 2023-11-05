import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../shared/interfaces/user-info";
import {BaseComponent} from "../../shared/components/base.component";
import {SharedService} from "../../shared/services/shared.service";
import {IonPopover, MenuController} from "@ionic/angular";
import {INavigationData} from "../../shared/interfaces/navigation-data";

@Component({
  selector: 'app-student',
  templateUrl: 'student-main.component.html',
  styleUrls: ['student-main.component.scss'],
})
export class StudentMainComponent extends BaseComponent implements OnInit {
  @ViewChild('popover') popover!: IonPopover;
  public userInfo!: IUserInfo;
  public isPopoverOpen = false;
  public navigationData!: INavigationData[];

  constructor(private route: ActivatedRoute, public sharedService: SharedService, private menu: MenuController) {
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

  public presentPopover(e: Event) {
    this.popover.event = e;
    this.isPopoverOpen = true;
  }

  public closeMenu() {
    this.menu.close()
  }

}
