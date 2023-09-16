import {Injectable} from "@angular/core";
import {collection, collectionData, getFirestore, where} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../interfaces/user-info";
import {take} from "rxjs";

@Injectable({providedIn: 'root'})
export class SharedService {
  db = getFirestore(initializeApp(environment.firebaseConfig));

  constructor(private fireStore: AngularFirestore) {
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
}
