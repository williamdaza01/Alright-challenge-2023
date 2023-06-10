import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogsignServiceService } from 'src/app/services/logsign-service.service';
import { errorForm } from 'src/utils/errorForm';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private service: LogsignServiceService, private router: Router, private sessionStorage: SessionStorageService) {}

  loginUser(){
    if (
      this.email &&
      this.password
    ) {
      const login_data = {
        email: this.email,
        password: this.password,
      };
      this.service.postLogin(login_data).subscribe(
        (userExist: boolean) => {
          console.log('Valor de userExist:', userExist);
          if (userExist) {
            this.sessionStorage.store('isLoggedIn', true);
            this.router.navigate(['/dashboard']);
          } else {
            errorForm();
            throw new Error('El usuario no existe');
          }
        },
        (error) => {
          console.error('Error en la solicitud POST:', error);
        }
      );
    } else {
      errorForm();
    }
  }
}
