import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {SharedService} from "../services/shared.service";
import {IUserInfo} from "../interfaces/user-info";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserBasicDataResolver {
  constructor(private sharedService: SharedService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserInfo> {
    return this.sharedService.getUser(route.paramMap.get('id') as string) as Observable<IUserInfo>
  }
}
