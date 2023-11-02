import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable, switchMap} from "rxjs";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {TeacherService} from "../services/teacher.service";
import {ISubjectData} from "../../../shared/interfaces/grade-data";

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
