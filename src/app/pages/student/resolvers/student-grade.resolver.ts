import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from "rxjs";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeData} from "../../../shared/interfaces/grade-data";
import {StudentService} from "../services/student.service";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {
  constructor(private studentService: StudentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGradeData[]> {
    const userInfo = route.parent?.data['userInfo'] as IUserInfo;
    return this.studentService.getStudentSubjects(userInfo)
  }
}
