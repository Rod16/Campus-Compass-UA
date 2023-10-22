import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {IUserInfo} from "../../../shared/interfaces/user-info";
import {SharedService} from "../../../shared/services/shared.service";
import {UniversityAuthorityService} from "../services/university-authority.service";
import {BaseComponent} from "../../../shared/components/base.component";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Role} from "../enums/role"
import {PageAction} from "../enums/page-action";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends BaseComponent implements OnInit {
  public userInfo!: IUserInfo;
  public action!: PageAction;
  public userForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    birthDate: ['2022-04-21', Validators.required],
    faculty: [''],
    university: [''],
    role: ['', Validators.required],
    password: [''],
    uid: [''],
  });
  public PageAction = PageAction;

  constructor(private route: ActivatedRoute, public sharedService: SharedService, public universityAuthorityService: UniversityAuthorityService, private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit() {
    super.unsubscribeOnComponentDestroy(this.route.data).subscribe((details) => {
      this.userInfo = details['userInfo'];
      this.action = details['action'];
      if (this.action === PageAction.Edit) {
        this.roleChange()
        this.userForm.patchValue({
          ...this.userInfo,
          birthDate: this.userInfo.birthDate?.split('.').reverse().join('-'),
        });
      }
    });
  }

  public saveUser() {
    if (this.userForm.valid) {
      this.formatDatePickerValue();
      this.sharedService.generateRandomId();
      if (this.action === PageAction.Create) {
        this.userForm.patchValue({
          password: this.sharedService.encryptData('Password'),
          faculty: this.userInfo.faculty,
          university: this.userInfo.university,
          uid: this.sharedService.id,
        });
      }
      if (this.userForm.get('group')) {
        this.userForm.patchValue({
          group: this.userForm.get('group')?.value.toUpperCase(),
        });
      }
      this.universityAuthorityService.saveUser({
        ...this.userForm.value,
        birthDate: this.formatDatePickerValue(),
      }, this.action);
    } else {
      //this.sharedService.presentToast('Please fill all the required fields');
    }
  }

  public formatDatePickerValue(): string {
    const parsedDate = this.userForm.get('birthDate')?.value.split('-');
    return parsedDate.reverse().join('.');
  }

  public roleChange(e?: CustomEvent) {
    if ((e && e.detail.value === Role.Student) || this.userInfo.role === Role.Student) {
      this.userForm.addControl('course', this.fb.control('', Validators.required));
      this.userForm.addControl('group', this.fb.control('', Validators.required));
    }
    else {
      this.userForm.removeControl('course');
      this.userForm.removeControl('group');
    }
  }

  protected readonly Role = Role;
}
