import { Component } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private sessionStorage: SessionStorageService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        const isLoggedIn = this.sessionStorage.retrieve('isLoggedIn');
        const isLoginPage = val.url.includes('/login');
        const isSignupPage = val.url.includes('/signup');

        if (!isLoggedIn && !isLoginPage && !isSignupPage) {
          this.router.navigateByUrl('/login');
        } else if (isLoggedIn && (isLoginPage || isSignupPage)) {
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }
}
