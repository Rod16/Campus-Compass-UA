import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {map, Observable} from "rxjs";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {TeacherService} from "../services/teacher.service";
import {ITeacherGrades} from "../../../shared/interfaces/grade-data";

@Injectable({ providedIn: 'root' })
export class StudentListResolver {
  constructor(private teacherService: TeacherService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITeacherGrades[]> {
    const userInfo = route.parent?.data['userInfo'] as IUserInfo;
    return this.teacherService.getTeacherSubjects(userInfo).pipe(map((subjects) => {
      return subjects.map((subject) => {
        return {
          subject: subject.subject,
          students: subject.gradesArray.map((student) => {
            return student.student;
          })
        }
      })
    }));
  }
}
