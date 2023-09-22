import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {map, Observable, switchMap} from "rxjs";
import {TeacherService} from "../services/teacher.service";
import {IGradeData} from "../../../shared/interfaces/grade-data";
import {IGradeDataExtended} from "../interfaces/grade-data-extended";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {
  constructor(private sharedService: SharedService, private teacherService: TeacherService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IGradeDataExtended> {
    const studentId = route.paramMap.get('studentId') as string;
    return this.sharedService.getUser(studentId).pipe(switchMap((doc) => {
      let userInfo!: IUserInfo;
      doc.docs.forEach((doc) => {
        userInfo = doc.data() as IUserInfo;
      });
      return this.teacherService.getGradesDocumentByStudentId(userInfo, route.paramMap.get('subject') as string).pipe(map((student) => {
        return {
          gradeData: student.data() as IGradeData,
          userInfo: userInfo
        }
      }))
    }));
  }
}
