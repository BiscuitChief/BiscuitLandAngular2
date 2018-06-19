import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { NavitemService } from './services/navitem.service';
import { LoginService } from './services/login.service';
import { ContactService } from './services/contact.service';
import { DatabaseScriptsService } from './services/database-scripts.service';
import { RecipeService } from './services/recipe.service';
import { FileUploaderService } from './services/file-uploader.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { LogoutComponent } from './logout/logout.component';
import { DatabaseScriptsComponent } from './database-scripts/database-scripts.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeComponent } from './recipe/recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RecipeSearchComponent,
    LogoutComponent,
    DatabaseScriptsComponent,
    ManageUsersComponent,
    RecipeCreateComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
],
  providers: [
    Title,
    NavitemService,
    LoginService,
    ContactService,
    DatabaseScriptsService,
    RecipeService,
    FileUploaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
