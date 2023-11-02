import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorisationService} from "./services/authorisation.service";
import {BaseComponent} from "../base.component";
import {IUserInfo} from "../../interfaces/user-info";
import {SharedService} from "../../services/shared.service";
import {UserRole} from "../../enums/user-role";

@Component({
  selector: 'app-authorisation',
  templateUrl: 'authorisation.component.html',
  styleUrls: ['authorisation.component.scss'],
})
export class AuthorisationComponent extends BaseComponent {
  public authForm = this.fb.group({
    email: [''],
    password: ['']
  })
  private userInfo!: IUserInfo;
  constructor(private fb: FormBuilder, private router: Router, public sharedService: SharedService, private authorisationService: AuthorisationService) {
    super();
  }

  public signIn() {
    super.unsubscribeOnComponentDestroy(this.authorisationService.login(this.authForm.get('email')?.value as string, this.authForm.get('password')?.value as string)).subscribe((user) => {
      if (user) {
        this.navigateByRole(user);
      }
    });
  }

  private navigateByRole(user: IUserInfo) {
    super.unsubscribeOnComponentDestroy(this.sharedService.getUser(user.uid)).subscribe((snapshot) => {
     this.userInfo = snapshot as IUserInfo;
      switch (this.userInfo.role) {
        case UserRole.Student:
          this.router.navigate(['student', this.userInfo.uid]);
          break;
        case UserRole.Teacher:
          this.router.navigate(['teacher', this.userInfo.uid]);
          break;
        case UserRole.UniversityAuthority:
          this.router.navigate(['authority', this.userInfo.uid]);
          break;
        case UserRole.InstitutionRepresentative:
          this.router.navigate(['institution', this.userInfo.uid]);
          break;
      }
    });
  }
}
