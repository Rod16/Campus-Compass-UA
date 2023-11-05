import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {IUserInfo} from "../interfaces/user-info";

@Injectable({ providedIn: 'root' })
export class ParentDataResolver {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): IUserInfo {
    return route.parent?.data['userInfo'] as IUserInfo;
  }
}
