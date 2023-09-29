import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntypedFormBuilder} from "@angular/forms";
import {Role} from "../role";
import {BaseComponent} from "../../../../shared/components/base.component";
import {IUserInfo} from "../../../../shared/interfaces/user-info";
import {SharedService} from "../../../../shared/services/shared.service";
import {UniversityAuthorityService} from "../../services/university-authority.service";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html'
})
export class CertificateComponent extends BaseComponent {
  @Input() selectedRole!: Role;
  @Input() userArray: IUserInfo[] = [];
  public chosenUser!: IUserInfo;
  public Role = Role;
  public isModalOpen = false;
  public id!: string;

  constructor(public sharedService: SharedService, public universityAuthorityService: UniversityAuthorityService) {
    super();
  }

  public toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen) {
      this.generateId();
    }
  }

  generateId() {
    this.sharedService.generateRandomId();
    this.id = this.sharedService.id;
  }

  saveStudentCertificate() {
    this.universityAuthorityService.saveCertificate(this.id, this.universityAuthorityService.generateStudentCertificate(this.chosenUser, this.id), this.chosenUser.name)
    this.toggleModal();
  }

  saveTeacherCertificate() {
    this.universityAuthorityService.saveCertificate(this.id, this.universityAuthorityService.generateTeacherCertificate(this.chosenUser, this.id), this.chosenUser.name)
    this.toggleModal();
  }
}
