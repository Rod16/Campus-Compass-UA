import {IUserInfo} from "./user-info";
import {Observable} from "rxjs";

export interface IGradeData {
  subject: string;
  grades: IGrade[];
}

export interface IGrade {
  mark: number;
  teacher: string;
  title: string;
}

export interface IStudentGrade {
  student: IUserInfo;
  grades: IGrade[];
}

export interface ISubjectData {
  subject: string;
  course: number;
  teacher: IUserInfo;
  gradesArray: IStudentGrade[];
}

export interface ITeacherGrades {
  subject: string;
  students: IUserInfo[];
}
