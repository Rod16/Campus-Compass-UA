import {Injectable} from "@angular/core";
import {getFirestore} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../interfaces/user-info";
import {Router} from "@angular/router";
import {of, switchMap} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {ToastController} from "@ionic/angular";
import {ToastType} from "../types/toastType";
import {ToastTypeEnum} from "../enums/toast-type";

@Injectable({providedIn: 'root'})
export class SharedService {
  db = getFirestore(initializeApp(environment.firebaseConfig));
  id = '';
  encryptSecretKey = 'secret-key'

  constructor(private fireStore: AngularFirestore, private router: Router, private toastController: ToastController) {
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  getScreenHeight(): number {
    return window.innerHeight;
  }

  getUser(uid: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('uid', '==', uid));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? of(snapshot.docs[0].data()) : of(null);
    }));
  }

  signOut(): void {
    this.router.navigate(["/authorisation"]).then(() => {
      this.presentToast('Ви успішно вийшли з акаунту', ToastTypeEnum.Success)
    });
  }

  generateRandomId(): void {
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  getTwoDigitNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  encryptData(data: string) {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
    } catch (e) {
      return Error;
    }
  }

  decryptData(data: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return data;
    } catch (e) {
      return Error;
    }
  }

  async presentToast(message: string, type: ToastType) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      buttons: [
        {
          icon: 'close-outline',
          role: 'cancel',
          cssClass: type === ToastTypeEnum.Success ? 'toast toast-success' : 'toast toast-error',
        },
      ],
      cssClass: type === ToastTypeEnum.Success ? 'toast toast-success' : 'toast toast-error',
      icon: type === ToastTypeEnum.Success ? 'checkmark-circle-outline' : 'alert-circle-outline'
    });

    await toast.present();
  }
}
