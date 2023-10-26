import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Firestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  public authForm = this.fb.group({
    email: [''],
    password: ['']
  })
  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router, private auth: AngularFireAuth, private zone: NgZone, public sharedService: SharedService) {}

  ngOnInit(): void {
    // this.auth.authState.subscribe((user) => {
    //   if (user) {
    //     this.zone.run(() => {
    //       this.router.navigate(["student"]);
    //     });
    //   }
    // });
  }

  public signIn() {
    this.auth
      .signInWithEmailAndPassword(this.authForm.get('email')?.value as string, this.authForm.get('password')?.value as string)
      .then(() => {
        this.router.navigate(["student"]);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }

  protected readonly window = window;
  protected readonly Number = Number;
}
