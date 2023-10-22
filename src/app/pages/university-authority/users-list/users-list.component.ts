import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {UniversityAuthorityService} from "../services/university-authority.service";
import {BaseComponent} from "../../../shared/components/base.component";
import {UntypedFormBuilder} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs";
import {UserRole} from "../../../shared/enums/user-role";

@Component({
  selector: 'app-edit-user',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public usersArray: IUserInfo[] = [];
  public searchTerm = this.fb.control('');

  constructor(private route: ActivatedRoute, public sharedService: SharedService, public universityAuthorityService: UniversityAuthorityService, private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).pipe(switchMap((details: Data) => {
      this.userInfo = details['userInfo'];
      return this.universityAuthorityService.searchUsers('', this.userInfo.university as string, this.userInfo.faculty);
    })).subscribe((usersArray: IUserInfo[]) => {
      this.usersArray = usersArray;
    });
    super.unsubscribeOnComponentDestroy(this.searchTerm.valueChanges).pipe(
      debounceTime(500),
      switchMap((searchTerm) => {
        return this.universityAuthorityService.searchUsers(searchTerm as string, this.userInfo.university as string, this.userInfo.faculty);
      })
    ).subscribe((usersArray: IUserInfo[]) => {
      this.usersArray = usersArray;
    });
  }

  protected readonly UserRole = UserRole;
}
