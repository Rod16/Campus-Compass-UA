export interface ISubjectStudents {
  subjectName: string;
  groups?: string[];
  individualStudents?: string[];
}

export interface ISubjectStudentsList {
  subjectsArray: ISubjectStudents[];
}
