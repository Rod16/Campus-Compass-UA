import {Injectable} from "@angular/core";
import {getFirestore} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../interfaces/user-info";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {of, switchMap} from "rxjs";
import * as CryptoJS from 'crypto-js';

@Injectable({providedIn: 'root'})
export class SharedService {
  db = getFirestore(initializeApp(environment.firebaseConfig));
  id = '';
  encryptSecretKey = 'secret-key'

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
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? of(snapshot.docs[0].data()) : of(null);
    }));
  }

  signOut(): void {
    this.router.navigate(["/authorisation"]);
  }

  generateRandomId(): void {
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  getTwoDigitNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  encryptData(data: string) {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
    } catch (e) {
      return Error;
    }
  }

  decryptData(data: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return data;
    } catch (e) {
      return Error;
    }
  }
}
