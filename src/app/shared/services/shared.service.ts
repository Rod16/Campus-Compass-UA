import {Injectable} from "@angular/core";
import {getFirestore} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../interfaces/user-info";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class SharedService {
  db = getFirestore(initializeApp(environment.firebaseConfig));

  constructor(private fireStore: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  getScreenHeight(): number {
    return window.innerHeight;
  }

  getUser(uid: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('uid', '==', uid));
    return query.get();
  }

  signOut(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(["/authorisation"]);
    });
  }
}
