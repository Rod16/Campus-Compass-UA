import {Injectable} from "@angular/core";
import {collection, collectionData, getFirestore, where} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private fireStore: AngularFirestore) {
  }

  getStudentData() {
    return this.fireStore.collection('students-data').get();
  }
}
