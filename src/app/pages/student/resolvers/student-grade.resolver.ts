import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeData} from "../../../shared/interfaces/grade-data";
import {StudentService} from "../services/student.service";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {
  constructor(private sharedService: SharedService, private studentService: StudentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGradeData[]> {
    return this.sharedService.getUser(route.paramMap.get('id') as string).pipe(switchMap((userInfoData) => {
      const userInfo = userInfoData as IUserInfo;
      return this.studentService.getStudentSubjects(userInfo)
    }));
  }
}
