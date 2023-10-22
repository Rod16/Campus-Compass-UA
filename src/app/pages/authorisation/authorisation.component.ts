import {Component, NgZone} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Firestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SharedService} from "../../shared/services/shared.service";
import {IUserInfo} from "../../shared/interfaces/user-info";
import {UserRole} from "../../shared/enums/user-role";
import {BaseComponent} from "../../shared/components/base.component";
import {AuthorisationService} from "./services/authorisation.service";

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
  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router, private auth: AngularFireAuth, private zone: NgZone, public sharedService: SharedService, private authorisationService: AuthorisationService) {
    super();
  }

  // ngOnInit(): void {
  //   super.unsubscribeOnComponentDestroy(this.auth.authState).subscribe((user) => {
  //     if (user) {
  //       this.zone.run(() => {
  //         this.navigateByRole(user);
  //       });
  //     }
  //   });
  // }

  public signIn() {
    // this.auth
    //   .signInWithEmailAndPassword(this.authForm.get('email')?.value as string, this.authForm.get('password')?.value as string)
    //   .then((user) => {
    //     this.navigateByRole(user);
    //   })
    //   .catch((error: any) => {
    //     alert(error.message);
    //   });
    super.unsubscribeOnComponentDestroy(this.authorisationService.login(this.authForm.get('email')?.value as string, this.authForm.get('password')?.value as string)).subscribe((user) => {
      if (user) {
        console.log(user);
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
