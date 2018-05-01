import { Component, OnInit, Inject } from '@angular/core';

import { DatabaseScriptsService } from '../services/database-scripts.service';

@Component({
  selector: 'app-database-scripts',
  templateUrl: './database-scripts.component.html',
  styleUrls: ['./database-scripts.component.scss']
})
export class DatabaseScriptsComponent implements OnInit {

  allowDbScripts: boolean = false;
  allowRecipeScripts: boolean = false;
  allowGenerateBackup: boolean = false;
  generateResults: string;
  errMsg: string;
  disableButton: boolean = false;

  constructor(private databaseScriptsService: DatabaseScriptsService) { }

  ngOnInit() {
    this.SetupLinks();
  }

  private SetupLinks() {
    this.databaseScriptsService.getSecurity()
      .subscribe(data => this.SetSecurity(data),
      errMsg => this.errMsg = <any>errMsg);
  }

  private SetSecurity(data: any) {
    this.allowDbScripts = data.AllowDbScripts;
    this.allowRecipeScripts = data.AllowRecipeScripts;
    this.allowGenerateBackup = data.AllowGenerateBackup;
  }

  CreateBackupScript() {
    this.generateResults = "Creating backup script";
    this.disableButton = true;

    this.databaseScriptsService.createDataBackupScripts()
      .subscribe(data => this.generateResults = data,
      errMsg => this.errMsg = <any>errMsg,
      () => this.disableButton = false);
  }
}
