import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SharedService {

  getScreenWidth(): number {
    return window.innerWidth;
  }

  getScreenHeight(): number {
    return window.innerHeight;
  }
}
