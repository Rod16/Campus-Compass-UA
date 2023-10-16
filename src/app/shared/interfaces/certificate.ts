export interface ICertificate {
  id: string;
  template: string;
  name: string;
  date: string;
  isApproved?: boolean;
  rejectReason?: string;
}
