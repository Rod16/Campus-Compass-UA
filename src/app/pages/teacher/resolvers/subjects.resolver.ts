import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {IGroupStudents} from "../interfaces/group-students";
import {combineLatest, Observable, of, switchMap} from "rxjs";
import {ISubjectStudentsList} from "../interfaces/teacher-data";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {TeacherService} from "../services/teacher.service";
import {IGradeData, ISubjectData} from "../../../shared/interfaces/grade-data";

@Injectable({ providedIn: 'root' })
export class SubjectsResolver {
  constructor(private sharedService: SharedService, private teacherService: TeacherService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISubjectData[]> {
    return this.sharedService.getUser(route.paramMap.get('id') as string).pipe(switchMap((userInfoData) => {
      const userInfo = userInfoData as IUserInfo;
      return this.teacherService.getTeacherSubjects(userInfo)
    }));
  }
}
