import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";

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
