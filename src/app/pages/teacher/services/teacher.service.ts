import {Injectable} from "@angular/core";
import {collection, collectionData, getFirestore, where} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";

@Injectable({providedIn: 'root'})
export class TeacherService {

  constructor(private fireStore: AngularFirestore) {
  }

  getTeacherData() {
    return this.fireStore.collection('teachers-data').get();
  }

  filterStudentsByGroup(group: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('group', '==', group));
    return query.get();
  }

  getIndividualStudentData(uidArray: string[]) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('uid', 'in', uidArray)
    );
    return query.get();
  }
}
