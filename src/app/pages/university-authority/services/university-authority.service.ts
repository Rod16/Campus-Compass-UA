import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {map, Observable, switchMap} from "rxjs";
import {SharedService} from "../../../shared/services/shared.service";
import {PageAction} from "../enums/page-action";
import {UserRole} from "../../../shared/enums/user-role";
import {BaseComponent} from "../../../shared/components/base.component";
import {IGrade} from "../../../shared/interfaces/grade-data";
import {ToastTypeEnum} from "../../../shared/enums/toast-type";

@Injectable({providedIn: 'root'})
export class UniversityAuthorityService extends BaseComponent {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
    super();
  }

  getFacultyStudents(university: string, faculty: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('faculty', '==', faculty).where('university', '==', university).where('role', '==', UserRole.Student));
    return query.get().pipe(map(snapshot => {
      return snapshot.docs.length > 0 ? snapshot.docs.map(student => student.data()) : [];
    }));
  }

  getTeachers(university: string) {
    const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
      ref.where('university', '==', university).where('role', '==', UserRole.Teacher));
    return query.get().pipe(map(snapshot => {
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
    }).then(() => {
      this.sharedService.presentToast('Довідку успішно збережено', ToastTypeEnum.Success);
    });
  }

  saveUser(user: IUserInfo, action: string) {
    if (action === PageAction.Create) {
      this.fireStore.collection('user-info').doc(user.uid).set(user).then(() => {
        this.sharedService.presentToast('Зміни користувача успішно збережено', ToastTypeEnum.Success);
      });
    } else {
      this.fireStore.collection('user-info').doc(user.uid).update(user).then(() => {
        this.sharedService.presentToast('Зміни користувача успішно збережено', ToastTypeEnum.Success);
      });
    }
  }

  addSubject(subject: string, teacher: IUserInfo, course: number, students?: IUserInfo[], groups?: string) {
    this.isLoading = true;
    let gradesArray: {student: IUserInfo, grades: IGrade[]}[] = [];
    if (groups?.length && groups.length > 0) {
      const parsedGroups = groups.split(',').map((group) => group.trim());
      const query = this.fireStore.collection<IUserInfo>('user-info', ref =>
        ref.where('university', '==', teacher.university)
          .where('role', '==', UserRole.Student)
          .where('group', 'in', parsedGroups));
      return super.unsubscribeOnComponentDestroy(query.get()).pipe(map(snapshot => {
        return snapshot.docs.length > 0 ? snapshot.docs.map(student => student.data()) : [];
      })).subscribe((groupStudents: IUserInfo[]) => {
        groupStudents.forEach((student) => {
          gradesArray.push({student: student, grades: []});
        });
        if (students) {
          students.forEach((student) => {
            gradesArray.push({student: student, grades: []});
          });
        }
        gradesArray = [...new Map(gradesArray.map(v => [v.student, v])).values()]
        this.fireStore.collection('teacher-student-connections').doc(`${teacher.university}-${teacher.uid}-${subject}-${course}`).set({
          subject: subject,
          teacher: teacher,
          course: course,
          university: teacher.university,
          gradesArray: gradesArray,
        }).then(() => {
          this.isLoading = false;
          this.sharedService.presentToast('Дисципліну успішно додано', ToastTypeEnum.Success);
        });
      });
    } else {
      if (students && students.length > 0) {
        for (let i = 0; i < students?.length; i++) {
          gradesArray.push({student: students[i], grades: []});
        }
        this.fireStore.collection('teacher-student-connections').doc(`${teacher.university}-${teacher.uid}-${subject}-${course}`).set({
          subject: subject,
          teacher: teacher,
          course: course,
          university: teacher.university,
          gradesArray: gradesArray,
        }).then(() => {
          this.isLoading = false;
          this.sharedService.presentToast('Дисципліну успішно додано', ToastTypeEnum.Success);
        });
      }
      return;
    }
  }
}
