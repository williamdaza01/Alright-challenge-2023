import { Component } from '@angular/core';
import { LogsignServiceService } from 'src/app/services/logsign-service.service';

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
      const forms = document.querySelectorAll('.needs-validation');

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add('was-validated');
          },
          false
        );
      });
    }
  }
}
