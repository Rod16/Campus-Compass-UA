import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {switchMap} from "rxjs";

@Injectable({providedIn: 'root'})
export class UniversityAuthorityService {

  constructor(private fireStore: AngularFirestore) {
  }

  getFacultyStudents(university: string, faculty: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('faculty', '==', faculty).where('university', '==', university).where('role', '==', 'student'));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(student => student.data()) : [];
    }));
  }

  getTeachers(university: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('university', '==', university).where('role', '==', 'teacher'));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(teacher => teacher.data()) : [];
    }));
  }

}
