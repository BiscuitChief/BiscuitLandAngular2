import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { RecipeSearchComponent } from '../recipe-search/recipe-search.component';
import { DatabaseScriptsComponent } from '../database-scripts/database-scripts.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'recipes/search', component: RecipeSearchComponent },
  { path: 'databasescripts', component: DatabaseScriptsComponent },
  { path: 'manageusers', component: ManageUsersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
