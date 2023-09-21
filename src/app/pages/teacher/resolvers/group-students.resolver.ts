import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {IGroupStudents} from "../interfaces/group-students";

@Injectable({ providedIn: 'root' })
export class GroupStudentsResolver {

  resolve(route: ActivatedRouteSnapshot): IGroupStudents {
    return {
      subject: route.paramMap.get('subject') as string,
      group: route.paramMap.get('group') as string,
    };
  }
}
