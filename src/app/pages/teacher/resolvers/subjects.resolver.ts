import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from "rxjs";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {TeacherService} from "../services/teacher.service";
import {ISubjectData} from "../../../shared/interfaces/grade-data";

@Injectable({ providedIn: 'root' })
export class SubjectsResolver {
  constructor(private teacherService: TeacherService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISubjectData[]> {
    const userInfo = route.parent?.data['userInfo'] as IUserInfo;
    return this.teacherService.getTeacherSubjects(userInfo);
  }
}
