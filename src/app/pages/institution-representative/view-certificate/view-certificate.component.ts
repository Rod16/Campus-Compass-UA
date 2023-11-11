import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {debounceTime, switchMap} from "rxjs";
import {BaseComponent} from "../../../shared/components/base.component";
import {InstitutionRepresentativeService} from "../services/institution-representative.service";
import {ICertificate} from "../../../shared/interfaces/certificate";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.scss'],
})
export class ViewCertificateComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public certificatesArray: ICertificate[] = [];
  public isModalOpen = false;
  public chosenCertificate!: ICertificate;
  public searchTerm = this.fb.control('');
  public rejectReason = this.fb.control('');
  public isRejected = false;

  constructor(private route: ActivatedRoute, public sharedService: SharedService, private institutionRepresentativeService: InstitutionRepresentativeService, private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).pipe(switchMap((details: Data) => {
      this.userInfo = details['userInfo'];
      return this.institutionRepresentativeService.searchCertificates('');
    })).subscribe((certificatesArray: ICertificate[]) => {
      this.certificatesArray = certificatesArray;
    });
    super.unsubscribeOnComponentDestroy(this.searchTerm.valueChanges).pipe(
      debounceTime(500),
      switchMap((searchTerm) => {
        return this.institutionRepresentativeService.searchCertificates(searchTerm as string);
      })
    ).subscribe((certificatesArray: ICertificate[]) => {
      this.certificatesArray = certificatesArray;
    });
  }

  public toggleModal(certificate: ICertificate) {
    this.chosenCertificate = certificate;
    this.isRejected = false;
    this.rejectReason.reset();
    this.isModalOpen = !this.isModalOpen;
  }

  public approveCertificate(certificate: ICertificate) {
    this.institutionRepresentativeService.approveCertificate(certificate);
    this.ngOnInit();
    this.toggleModal(certificate);
  }

  public rejectCertificate() {
    this.isRejected = true;
  }

  public confirmRejection(certificate: ICertificate) {
    if (this.rejectReason.value && this.rejectReason.value?.length > 0) {
      this.institutionRepresentativeService.rejectCertificate(certificate, this.rejectReason.value as string);
      this.ngOnInit();
      this.toggleModal(this.chosenCertificate);
    }
  }
}
