import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register-main',
  templateUrl: 'login-register-main.page.html'
})
export class LoginRegisterMainPage implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }


  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/tabs/principal-menu']);
    }
  }
}
