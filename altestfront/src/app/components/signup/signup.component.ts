import { Component } from '@angular/core';
import { LogsignServiceService } from 'src/app/services/logsign-service.service';
import { errorForm } from 'src/utils/errorForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  conf_password: string = '';

  constructor(private service: LogsignServiceService) {}

  signupUser() {
    if (
      this.name &&
      this.lastname &&
      this.email &&
      this.password &&
      this.conf_password &&
      this.conf_password === this.password
    ) {
      const signup_data = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };
      this.service.postSignUp(signup_data);
    } else {
      errorForm();
    }
  }
}
