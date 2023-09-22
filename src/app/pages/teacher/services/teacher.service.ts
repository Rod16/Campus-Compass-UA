import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeData} from "../../../shared/interfaces/grade-data";

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

  getGradesDocumentByStudentId(student: IUserInfo, subject: string) {
    const documentKey = `${student.university}-${student.faculty}-${student.group}-${student.uid}-grades-${subject}`;
    return this.fireStore.collection('students-data').doc(documentKey).get();
  }

  getStudentsByGroup(groupId: string, university: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('group', '==', groupId).where('university', '==', university));
    return query.get();
  }

  updateGradesDocument(gradesData: IGradeData, subject: string, studentInfo: IUserInfo) {
    const documentKey = `${studentInfo.university}-${studentInfo.faculty}-${studentInfo.group}-${studentInfo.uid}-grades-${subject}`;
    return this.fireStore.collection('students-data').doc(documentKey).update(gradesData);
  }

}
