import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {ISubjectData} from "../../../shared/interfaces/grade-data";
import {map, Observable, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {ToastTypeEnum} from "../../../shared/enums/toast-type";

@Injectable({providedIn: 'root'})
export class TeacherService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
  }

  updateGrades(subjectData: ISubjectData) {
    const documentKey = `${subjectData.teacher.university}-${subjectData.teacher.uid}-${subjectData.subject}-${subjectData.course}`;
    return this.fireStore.collection('teacher-student-connections').doc(documentKey).update(subjectData).then(() => {
      this.sharedService.presentToast('Оцінки успішно оновлено', ToastTypeEnum.Success);
    });
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
    this.fireStore.collection('teacher-student-connections').doc(`${subjectData.teacher.university}-${subjectData.teacher.uid}-${subjectData.subject}-${subjectData.course}`).update(subjectData).then(() => {
      this.sharedService.presentToast('Предмет успішно оновлено', ToastTypeEnum.Success);
    });
  }

}
