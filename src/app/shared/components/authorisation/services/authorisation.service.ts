import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {switchMap} from "rxjs";
import {SharedService} from "../../../services/shared.service";
import {IUserInfo} from "../../../interfaces/user-info";

@Injectable({providedIn: 'root'})
export class AuthorisationService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
  }

  login(email: string, password: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('email', '==', email));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 && this.sharedService.decryptData(snapshot.docs[0].data().password) === password ? snapshot.docs.map(student => student.data()) : []//this.sharedService.presentToast('Please fill all the required fields');;
    }));
  }
}
