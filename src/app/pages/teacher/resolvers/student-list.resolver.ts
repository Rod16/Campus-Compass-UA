import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {combineLatest, Observable, of, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {ISubjectStudentsList} from "../interfaces/teacher-data";
import {TeacherService} from "../services/teacher.service";

@Injectable({ providedIn: 'root' })
export class StudentListResolver {
  constructor(private sharedService: SharedService, private teacherService: TeacherService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubjectStudentsList | null> {
    return this.sharedService.getUser(route.paramMap.get('id') as string).pipe(switchMap((userInfoData) => {
      const userInfo = userInfoData as IUserInfo;
      let studentData: ISubjectStudentsList;
      return combineLatest([
        of(`${userInfo.university}-${userInfo.uid}-students-data`),
        this.teacherService.getTeacherData()
      ]).pipe(
        switchMap(([documentKeys, doc]) => {
          const studentsData = doc.docs.find((item) => documentKeys.includes(item.id));
          if (studentsData) {
            studentData = studentsData.data() as ISubjectStudentsList;
            return of(studentData);
          } else {
            return of(null);
          }
        })
      );
    }));
  }
}
