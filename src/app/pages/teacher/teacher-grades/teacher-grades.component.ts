import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {AngularFirestore, QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {TeacherService} from "../services/teacher.service";
import {ISubjectStudents, ISubjectStudentsList} from "../interfaces/teacher-data";
import {catchError, combineLatest, delay, map, of, Subject, switchMap, takeUntil} from "rxjs";
import {StudentService} from "../../student/services/student.service";
import {BaseComponent} from "../../../shared/components/base.component";
import {Firestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-student',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss'],
})
export class TeacherGradesComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentData!: ISubjectStudentsList;
  notifier = new Subject()

  constructor(private route: ActivatedRoute, public teacherService: TeacherService, private studentService: StudentService, private fireStore: AngularFirestore) {
    super();
  }

  ngOnInit() {

    super.unsubscribeOnComponentDestroy(this.route.data).pipe(
      switchMap((details: Data) => {
        const userInfoDocs = details['userInfo'] as QuerySnapshot<IUserInfo>;

        // Use combineLatest to fetch data from teacherService.getTeacherData() and userInfoDocs
        return combineLatest([
          of(userInfoDocs.docs.map((doc) => {
            this.userInfo = doc.data() as IUserInfo;
            return `${this.userInfo.university}-${this.userInfo.uid}-students-data`;
          })),
          super.unsubscribeOnComponentDestroy(this.teacherService.getTeacherData())
        ]).pipe(
          switchMap(([documentKeys, doc]) => {
            const studentsData = doc.docs.find((item) => documentKeys.includes(item.id));

            if (studentsData) {
              this.studentData = studentsData.data() as ISubjectStudentsList;
              return of(this.studentData);
            } else {
              return of(null); // or an appropriate default value
            }
          })
        );
      }),
      catchError((error) => {
        // Handle errors here
        console.error('Error:', error);
        return of(null); // or handle the error as needed
      })
    ).subscribe((studentData) => {
      // Use studentData here or perform additional actions.
      if (studentData) {
        console.log('Student Data:', studentData);
        studentData.subjectsArray.forEach((item) => {
          const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
            ref.where('uid', 'in', item.individualStudents));
          query.get().subscribe((doc) => {
            console.log('Student Data:', doc.docs.map((item) => item.data() as IUserInfo));
          });
        })
      } else {
        console.log('Student Data is not available.');
      }
    });
  }

  public extractStudentByGroup(group: string) {
    return this.teacherService.filterStudentsByGroup(group)
  }

}
