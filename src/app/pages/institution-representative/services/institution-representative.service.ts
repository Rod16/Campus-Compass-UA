import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {filter, map, Observable} from "rxjs";
import {ICertificate} from "../../../shared/interfaces/certificate";

@Injectable({providedIn: 'root'})
export class InstitutionRepresentativeService {

  constructor(private fireStore: AngularFirestore) {
  }

  getCertificates(): Observable<ICertificate[]> {
    return this.fireStore.collection('certificates').get().pipe(map((snapshot) => {
      return snapshot.docs.map((certificate) => {
        return certificate.data() as ICertificate;
      });
    }));
  }

  searchCertificates(searchTerm: string): Observable<ICertificate[]> {
    return this.fireStore.collection('certificates').get().pipe(map((snapshot) => {
      return snapshot.docs.map((certificate) => {
        return certificate.data() as ICertificate;
      }).filter((certificate: ICertificate) => {
        return certificate.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }));
  }

  approveCertificate(certificate: ICertificate) {
    this.fireStore.collection('certificates').doc(certificate.id).update({
      id: certificate.id,
      template: certificate.template,
      name: certificate.name,
      date: certificate.date,
      isApproved: true
    })
  }

  rejectCertificate(certificate: ICertificate, rejectReason: string) {
    this.fireStore.collection('certificates').doc(certificate.id).update({
      id: certificate.id,
      template: certificate.template,
      name: certificate.name,
      date: certificate.date,
      isApproved: false,
      rejectReason: rejectReason
    })
  }

}
