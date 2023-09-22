import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Firestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SharedService} from "../../shared/services/shared.service";
import {IUserInfo} from "../../shared/interfaces/user-info";
import {UserRole} from "../../shared/enums/user-role";

@Component({
  selector: 'app-authorisation',
  templateUrl: 'authorisation.component.html',
  styleUrls: ['authorisation.component.scss'],
})
export class AuthorisationComponent implements OnInit {
  public authForm = this.fb.group({
    email: [''],
    password: ['']
  })
  private userInfo!: IUserInfo;
  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router, private auth: AngularFireAuth, private zone: NgZone, public sharedService: SharedService) {}

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.zone.run(() => {
          this.navigateByRole(user);
        });
      }
    });
  }

  public signIn() {
    this.auth
      .signInWithEmailAndPassword(this.authForm.get('email')?.value as string, this.authForm.get('password')?.value as string)
      .then((user) => {
        this.navigateByRole(user);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }

  private navigateByRole(user: any) {
    let uid = user.user? user.user.uid : user._delegate.uid;
    this.sharedService.getUser(uid).subscribe((snapshot) => {
      snapshot.forEach(doc => {
        this.userInfo = doc.data();
        switch (this.userInfo.role) {
          case UserRole.Student:
            this.router.navigate(['student', this.userInfo.uid]);
            break;
          case UserRole.Teacher:
            this.router.navigate(['teacher', this.userInfo.uid]);
        }
      })});
  }
}
