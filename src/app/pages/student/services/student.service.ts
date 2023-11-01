import {Injectable} from "@angular/core";
import {collection, collectionData, getFirestore, where} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {map} from "rxjs";
import {IGradeData, IStudentGrade, ISubjectData} from "../../../shared/interfaces/grade-data";

@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private fireStore: AngularFirestore) {
  }

  getStudentData() {
    return this.fireStore.collection('students-data').get();
  }

  getStudentSubjects(student: IUserInfo) {
    const query = this.fireStore.collection('teacher-student-connections', ref => {
      return ref.where('course', '==', student.course).where('university', '==', student.university);
    });
    const subjectsArray: IGradeData[] = [];
    return query.get().pipe(map((snapshot) => {
      for (const subject of snapshot.docs) {
        for (const grade of (subject.data() as ISubjectData).gradesArray) {
          if (grade.student.uid === student.uid) {
            subjectsArray.push({
              subject: (subject.data() as ISubjectData).subject,
              grades: grade.grades
            });
          }
        }
      }
      return subjectsArray;
    }));
  }
}
