import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProjetComponent } from './projet/projet.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProjetService } from './services/projet-service';
import { ChronoTacheComponent } from './chrono-tache/chrono-tache.component';

const appRoutes: Routes = [
  { path: 'projet/:id', component: ProjetComponent },
  { path: 'menu', component: MenuComponent },
  { path: '', component: ChronoTacheComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProjetComponent,
    ChronoTacheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    ProjetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
