import { Component, OnInit, Inject } from '@angular/core';

import { NavitemService } from '../services/navitem.service';

import { NavItem } from '../shared/navitem.type';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {

  navItemList: NavItem[];
  errMsg: string;

  constructor(private navitemService: NavitemService) { }

  ngOnInit() {
    this.LoadTopNavMenu();
  }

  LoadTopNavMenu() {
    this.navitemService.topNavigation
      .subscribe(navlist => this.navItemList = navlist,
      errMsg => this.errMsg = <any>errMsg);
  }
}
