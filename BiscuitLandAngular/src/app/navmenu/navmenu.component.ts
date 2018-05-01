import { Component, OnInit, Inject } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NavitemService } from '../services/navitem.service';

import { NavItem } from '../shared/navitem.type';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {

  navItemList: NavItem[];
  pageTitle: string;
  errMsg: string;

  constructor(private navitemService: NavitemService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.LoadTopNavMenu();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.SetupTitle();
      }
    });
  }

  private LoadTopNavMenu() {
    this.navitemService.topNavigation
      .subscribe(navlist => this.navItemList = navlist,
      errMsg => this.errMsg = <any>errMsg);
  }

  private SetupTitle() {
    if (this.router.url == "/databasescripts") {
      this.pageTitle = "Download Database Files";
    } else if (this.router.url == "/about") {
      this.pageTitle = "About my site";
    } else if (this.router.url == "/contact") {
      this.pageTitle = "Contact Information";
    } else if (this.router.url == "/login") {
      this.pageTitle = "Login";
    } else if (this.router.url == "/recipes/search") {
      this.pageTitle = "Search Recipes";
    } else if (this.router.url == "/manageusers") {
      this.pageTitle = "Manage Users";
    } else {
      this.pageTitle = "Welcome to my .NET site";
    }
    this.titleService.setTitle(this.pageTitle);
  }
}
