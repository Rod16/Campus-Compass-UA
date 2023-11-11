import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {switchMap} from "rxjs";
import {SharedService} from "../../../services/shared.service";
import {IUserInfo} from "../../../interfaces/user-info";
import {ToastTypeEnum} from "../../../enums/toast-type";

@Injectable({providedIn: 'root'})
export class AuthorisationService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
  }

  login(email: string, password: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('email', '==', email));
    return query.get().pipe(switchMap(snapshot => {
      if (snapshot.docs.length === 0) {
        this.sharedService.presentToast('Неправильний логін та/або пароль', ToastTypeEnum.Error);
      }
      return snapshot.docs.length > 0 && this.sharedService.decryptData(snapshot.docs[0].data().password) === password ? snapshot.docs.map(student => student.data()) : []
    }));
  }
}
