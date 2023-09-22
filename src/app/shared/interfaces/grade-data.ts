export interface IGradeData {
  subject: string;
  grades: IGrade[];
}

export interface IGrade {
  date: string;
  mark: number;
  teacher: string;
  title: string;
}
