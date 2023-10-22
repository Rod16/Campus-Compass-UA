import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {map, Observable, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {PageAction} from "../enums/page-action";
import {getFirestore} from "@angular/fire/firestore";
import {initializeApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ICertificate} from "../../../shared/interfaces/certificate";
import {Role} from "../enums/role";
import {UserRole} from "../../../shared/enums/user-role";

@Injectable({providedIn: 'root'})
export class UniversityAuthorityService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService, private auth: AngularFireAuth) {
  }

  getFacultyStudents(university: string, faculty: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('faculty', '==', faculty).where('university', '==', university).where('role', '==', UserRole.Student));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(student => student.data()) : [];
    }));
  }

  getTeachers(university: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('university', '==', university).where('role', '==', UserRole.Teacher));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(teacher => teacher.data()) : [];
    }));
  }

  searchUsers(searchTerm: string, university: string, faculty?: string): Observable<IUserInfo[]> {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
        ref.where('university', '==', university));
    return query.get().pipe(map((snapshot) => {
      return snapshot.docs.map((user) => {
        return user.data() as IUserInfo;
      }).filter((user: IUserInfo) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) && user.role !== UserRole.UniversityAuthority && ((user.role === UserRole.Student && user.faculty === faculty) || user.role === UserRole.Teacher);
      });
    }));
  }

  generateStudentCertificate(student: IUserInfo, id: string): string {
    const date = this.sharedService.getTwoDigitNumber(new Date().getDate()) + '.' + this.sharedService.getTwoDigitNumber(Number(new Date().getMonth() + 1)) + '.' + new Date().getFullYear();
    return `<div>
      <p class="d2">Дата: <span class="d1">${date}</span></p>
      <p class="d2">Ідентифікатор: <span class="d1">${id}</span></p>
      <p class="t1 text-center">ДОВІДКА</p>
      <p class="d2">Видана <span class="d1">${student.name}</span>, <span class="d1">${student.birthDate}</span> року
      народження, про те, що він/вона станом на <span class="d1">${date}</span> навчається на
      <span class="d1">${student.course}</span> курсі університету <span class="d1">${student.university}</span> на
      факультеті <span class="d1">${student.faculty}</span>.</p>
      <p class="d2">Довідку видано для подання за вимогою.</p>
      <p class="d2">Довідку згенеровано сервісом Campus Compass UA.</p>
      <p class="d2">Довідка не потребує підпису та печатки.</p>
      <p class="d2">Довідка дійсна протягом 100 днів з дати видачі.</p>
    </div>`
  }

  generateTeacherCertificate(teacher: IUserInfo, id: string): string {
    const date = this.sharedService.getTwoDigitNumber(new Date().getDate()) + '.' + this.sharedService.getTwoDigitNumber(Number(new Date().getMonth() + 1)) + '.' + new Date().getFullYear();
    return `<div>
      <p class="d2">Дата: <span class="d1">${date}</span></p>
      <p class="d2">Ідентифікатор: <span class="d1">${id}</span></p>
      <p class="t1 text-center">ДОВІДКА</p>
      <p class="d2">Видана <span class="d1">${teacher.name}</span>, <span class="d1">${teacher.birthDate}</span> року
      народження, про те, що він/вона станом на <span class="d1">${date}</span> обіймає посаду викладача університету <span class="d1">${teacher.university}</span>.</p>
      <p class="d2">Довідку видано для подання за вимогою.</p>
      <p class="d2">Довідку згенеровано сервісом Campus Compass UA.</p>
      <p class="d2">Довідка не потребує підпису та печатки.</p>
      <p class="d2">Довідка дійсна протягом 100 днів з дати видачі.</p>
    </div>`
  }

  saveCertificate(id: string, template: string, name: string) {
    this.fireStore.collection('certificates').doc(id).set({
      id,
      template,
      name,
      date: this.sharedService.getTwoDigitNumber(new Date().getDate()) + '.' + this.sharedService.getTwoDigitNumber(Number(new Date().getMonth() + 1)) + '.' + new Date().getFullYear()
    })
  }

  saveUser(user: IUserInfo, action: string) {
    if (action === PageAction.Create) {
      this.fireStore.collection('user-info').doc(user.uid).set(user).then(() => {
            //this.sharedService.presentToast('Please fill all the required fields');
      });
    } else {
      this.fireStore.collection('user-info').doc(user.uid).update(user).then(() => {//this.sharedService.presentToast('Please fill all the required fields');;
    });
  }

}}
