import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {ICertificate} from "../../../shared/interfaces/certificate";
import {SharedService} from "../../../shared/services/shared.service";
import {ToastTypeEnum} from "../../../shared/enums/toast-type";

@Injectable({providedIn: 'root'})
export class InstitutionRepresentativeService {

  constructor(private fireStore: AngularFirestore, private sharedService: SharedService) {
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
    }).then(() => {
      this.sharedService.presentToast('Зміни успішно збережено', ToastTypeEnum.Success)
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
    }).then(() => {
      this.sharedService.presentToast('Зміни успішно збережено', ToastTypeEnum.Success)
    })
  }

}
