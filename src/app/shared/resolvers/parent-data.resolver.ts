import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {SharedService} from "../services/shared.service";
import {IUserInfo} from "../interfaces/user-info";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ParentDataResolver {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): IUserInfo {
    return route.parent?.data['userInfo'] as IUserInfo;
  }
}
