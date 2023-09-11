import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Firestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SharedService} from "../../shared/services/shared.service";

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
  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router, private auth: AngularFireAuth, private zone: NgZone, public sharedService: SharedService) {}

  ngOnInit(): void {
    // this.auth.authState.subscribe((user) => {
    //   if (user) {
    //     this.zone.run(() => {
    //       this.router.navigate(["home"]);
    //     });
    //   }
    // });
  }

  public signIn() {
    this.auth
      .signInWithEmailAndPassword(this.authForm.get('email')?.value as string, this.authForm.get('password')?.value as string)
      .then(() => {
        this.router.navigate(["home"]);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }

  protected readonly window = window;
  protected readonly Number = Number;
}
