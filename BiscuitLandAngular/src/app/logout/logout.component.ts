import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service';
import { NavitemService } from '../services/navitem.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  errMsg: string;

  constructor(private loginService: LoginService,
    private navitemService: NavitemService,
    private router: Router) { }

  ngOnInit() {
    this.loginService.logout()
      .subscribe(msg => this.Logout(),
      errMsg => this.errMsg = <any>errMsg);
  }

  Logout() {
    this.navitemService.topNavigation
      .subscribe(navlist => this.router.navigateByUrl("/"),
      errMsg => this.errMsg = <any>errMsg);

    this.navitemService.refreshTopNavigation();
  }
}
