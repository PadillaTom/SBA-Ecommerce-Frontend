import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      console.log('IS AUTHENTICATED: ' + result);
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    console.log('IS AUTH:' + this.isAuthenticated);

    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then((res) => {
        // User Email:
        const theEmail = res.email.toLowerCase();
        this.storage.setItem('userEmail', JSON.stringify(theEmail));
      });
    }
  }

  logout() {
    this.oktaAuthService.signOut();
  }
}
