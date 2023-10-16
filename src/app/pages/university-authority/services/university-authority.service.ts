import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";

@Injectable({providedIn: 'root'})
export class UniversityAuthorityService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
  }

  getFacultyStudents(university: string, faculty: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('faculty', '==', faculty).where('university', '==', university).where('role', '==', 'student'));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(student => student.data()) : [];
    }));
  }

  getTeachers(university: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('university', '==', university).where('role', '==', 'teacher'));
    return query.get().pipe(switchMap(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(teacher => teacher.data()) : [];
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

}
