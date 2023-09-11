import { Component, ContentChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {
  @ContentChild(IonInput) input!: IonInput;
  public showPassword = false;

  constructor() {}

  toggleShow(): void {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
}
