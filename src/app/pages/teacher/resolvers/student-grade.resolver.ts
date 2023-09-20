import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {IGradeParams} from "../interfaces/grade-params";

@Injectable({ providedIn: 'root' })
export class StudentGradeResolver {

  resolve(route: ActivatedRouteSnapshot): IGradeParams {
    return {
      subject: route.paramMap.get('subject') as string,
      group: route.paramMap.get('group') as string,
      faculty: route.paramMap.get('faculty') as string,
      uid: route.paramMap.get('uid') as string
    };
  }
}
