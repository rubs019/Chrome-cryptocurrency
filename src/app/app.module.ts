import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';

import { TablesComponent } from './home/tables/tables.component';
import { SettingsComponent } from './home/settings/settings.component';

import { ApiService } from './services/api.service';
import { HomeComponent } from './home/home.component';
import {StorageService} from './services/storage.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    SettingsComponent,
    CryptoDetailComponent,
    SettingsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [
    ApiService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
