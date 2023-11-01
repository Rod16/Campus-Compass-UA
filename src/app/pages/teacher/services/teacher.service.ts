import {Injectable} from "@angular/core";
import {AngularFirestore, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeData, ISubjectData} from "../../../shared/interfaces/grade-data";
import {filter, map, Observable, switchMap} from "rxjs";
import {fileTray} from "ionicons/icons";
import {SharedService} from "../../../shared/services/shared.service";

@Injectable({providedIn: 'root'})
export class TeacherService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
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

  updateGrades(subjectData: ISubjectData) {
    const documentKey = `${subjectData.teacher.university}-${subjectData.teacher.uid}-${subjectData.subject}-${subjectData.course}`;
    return this.fireStore.collection('teacher-student-connections').doc(documentKey).update(subjectData);
  }

  getTeacherSubjects(teacher: IUserInfo): Observable<ISubjectData[]> {
    const query = this.fireStore.collection('teacher-student-connections', ref => {
      return ref.where('teacher.uid', '==', teacher.uid).where('university', '==', teacher.university);
    });
    return query.get().pipe(map((snapshot) => {
      return snapshot.docs.map(subject => subject.data() as ISubjectData);
    }));
  }

  getSubjectData(teacher: IUserInfo, studentUID: string, subject: string): Observable<ISubjectData> {
    return this.sharedService.getUser(studentUID).pipe(switchMap((student: IUserInfo | null) => {
      return this.fireStore.collection('teacher-student-connections').doc(`${teacher.university}-${teacher.uid}-${subject}-${student?.course}`).get().pipe(map(subjectData => subjectData.data() as ISubjectData));
    }));
  }

  updateSubjectsData(subjectData: ISubjectData) {
    this.fireStore.collection('teacher-student-connections').doc(`${subjectData.teacher.university}-${subjectData.teacher.uid}-${subjectData.subject}-${subjectData.course}`).update(subjectData);
  }

}
