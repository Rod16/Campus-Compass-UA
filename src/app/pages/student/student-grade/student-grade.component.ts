import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Params} from "@angular/router";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {UserRole} from "../../../shared/enums/user-role";
import {StudentService} from "../services/student.service";
import {IStudentData} from "../../../shared/interfaces/student-data";

@Component({
  selector: 'app-student',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
})
export class StudentGradeComponent implements OnInit {
  public userInfo!: IUserInfo;
  public studentDataArray: IStudentData[] = [];

  constructor(private route: ActivatedRoute, public studentService: StudentService) {}

  ngOnInit() {
    let documentKey: string;
    this.route.data.subscribe((details: Data) => {
      (details['userInfo'] as QuerySnapshot<IUserInfo>).forEach(doc => {
        this.userInfo = doc.data() as IUserInfo;
        documentKey = `${this.userInfo.university}-${this.userInfo.faculty}-${this.userInfo.group}-${this.userInfo.uid}`;
        this.studentService.getStudentData().subscribe((doc) => {
          doc.docs.forEach((item) => {
            if (item.id.startsWith(documentKey)) {
              this.studentDataArray.push(item.data() as IStudentData);
            }
          })
        });
      })
    });
  }

}
