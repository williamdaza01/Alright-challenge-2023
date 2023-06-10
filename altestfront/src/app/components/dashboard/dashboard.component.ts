import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router, private sessionStorage: SessionStorageService) {}

  logout() {
    this.sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
}
