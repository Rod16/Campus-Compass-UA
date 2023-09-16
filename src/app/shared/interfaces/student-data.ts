export interface IStudentData {
  discipline: string;
  grades: IGrade[];
}

export interface IGrade {
  date: string;
  mark: number;
  teacher: string;
  title: string;
}
