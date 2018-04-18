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
  errMess: string;

  constructor(private navitemService: NavitemService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.LoadTopNavMenu();
  }

  LoadTopNavMenu() {
    this.navitemService.getNavItems()
      .subscribe(navlist => this.navItemList = navlist,
      errmess => this.errMess = <any>errmess);
  }

}
