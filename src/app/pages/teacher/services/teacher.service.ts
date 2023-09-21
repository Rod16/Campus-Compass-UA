import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeParams} from "../interfaces/grade-params";

@Injectable({providedIn: 'root'})
export class TeacherService {

  constructor(private fireStore: AngularFirestore) {
  }

  getTeacherData() {
    return this.fireStore.collection('teachers-data').get();
  }

  getIndividualStudents(uidArray: string[]) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('uid', 'in', uidArray));
    return query.get();
  }

  getGradesDocument(gradeParams: IGradeParams) {
    const documentKey = `${gradeParams.university}-${gradeParams.faculty}-${gradeParams.group}-${gradeParams.uid}-grades-${gradeParams.subject}`;
    return this.fireStore.collection('students-data').doc(documentKey).get();
  }

  getGradesDocumentByStudentId(student: IUserInfo, subject: string) {
    const documentKey = `${student.university}-${student.faculty}-${student.group}-${student.uid}-grades-${subject}`;
    return this.fireStore.collection('students-data').doc(documentKey).get();
  }

  getStudentsByGroup(groupId: string, university: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('group', '==', groupId).where('university', '==', university));
    return query.get();
  }
}
