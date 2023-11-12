import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {Observable} from "rxjs";
import {TeacherService} from "../services/teacher.service";
import {ISubjectData} from "../../../shared/interfaces/grade-data";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {
  constructor(private teacherService: TeacherService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISubjectData> {
    const studentId = route.paramMap.get('studentId') as string;
    const subject = route.paramMap.get('subject') as string;
    const userInfo = route.parent?.data['userInfo'] as IUserInfo;
    return this.teacherService.getSubjectData(userInfo, studentId, subject);
  }
}
