import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {map, Observable, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {TeacherService} from "../services/teacher.service";
import {ITeacherGrades} from "../../../shared/interfaces/grade-data";

@Injectable({ providedIn: 'root' })
export class StudentListResolver {
  constructor(private sharedService: SharedService, private teacherService: TeacherService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeacherGrades[]> {
    return this.sharedService.getUser(route.paramMap.get('id') as string).pipe(switchMap((userInfoData) => {
      const userInfo = userInfoData as IUserInfo;
      return this.teacherService.getTeacherSubjects(userInfo).pipe(map((subjects) => {
        return subjects.map((subject) => {
          return {
            subject: subject.subject,
            students: subject.gradesArray.map((student) => {
              return student.student;
            })
          }
        })
      }))
    }));
  }
}
