import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {IUserInfo} from "../../../shared/interfaces/user-info";

@Injectable({ providedIn: 'root' })
export class UserEditDataResolver {
  constructor(private sharedService: SharedService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserInfo> {
    return this.sharedService.getUser(route.paramMap.get('user-uid') as string) as Observable<IUserInfo>
  }
}
