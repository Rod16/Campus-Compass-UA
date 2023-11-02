import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {Observable, switchMap} from "rxjs";
import {TeacherService} from "../services/teacher.service";
import {ISubjectData} from "../../../shared/interfaces/grade-data";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {
  constructor(private sharedService: SharedService, private teacherService: TeacherService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISubjectData> {
    const studentId = route.paramMap.get('studentId') as string;
    const subject = route.paramMap.get('subject') as string;
    return this.sharedService.getUser(route.paramMap.get('id') as string).pipe(switchMap((userInfoData) => {
      const userInfo = userInfoData as IUserInfo;
      return this.teacherService.getSubjectData(userInfo, studentId, subject)
    }));
  }
}
