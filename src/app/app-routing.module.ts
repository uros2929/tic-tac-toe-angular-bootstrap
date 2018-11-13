import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { StorageOfGamesComponent } from './storage-of-games/storage-of-games.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: "main", component: MainComponent },
  { path: "about", component: AboutComponent },
  { path: "storageOfGames", component: StorageOfGamesComponent },
  { path: "contact", component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
