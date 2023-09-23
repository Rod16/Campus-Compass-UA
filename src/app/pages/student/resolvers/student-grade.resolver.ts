import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {combineLatest, Observable, of, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {IGradeData} from "../../../shared/interfaces/grade-data";
import {StudentService} from "../services/student.service";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {
  constructor(private sharedService: SharedService, private studentService: StudentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGradeData[]> {
    let studentGradeArray: IGradeData[] = [];
    return this.sharedService.getUser(route.paramMap.get('id') as string).pipe(switchMap((userInfoData) => {
      const userInfo = userInfoData as IUserInfo;
      const documentKey = `${userInfo.university}-${userInfo.faculty}-${userInfo.group}-${userInfo.uid}-grades`;
      return this.studentService.getStudentData().pipe(switchMap((doc) => {
        doc.docs.forEach((item) => {
          if (item.id.startsWith(documentKey)) {
            studentGradeArray.push(item.data() as IGradeData);
          }
        })
        return of(studentGradeArray);
      }));
    }));
  }
}
