import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth.interceptor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRoutingModule } from './app-routing.module';


import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';


import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MasterkpaComponent } from './components/masterkpa/masterkpa.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterppkComponent } from './components/masterppk/masterppk.component';
import { TindaklanjutComponent } from './components/tindaklanjut/tindaklanjut.component';
import { ApprovaldocComponent } from './components/approvaldoc/approvaldoc.component';
import { CabangComponent } from './components/cabang/cabang.component';
import { SatkerComponent } from './components/satker/satker.component';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    SidebarComponent,
    MasterkpaComponent,
    DashboardComponent,
    MasterppkComponent,
    TindaklanjutComponent,
    ApprovaldocComponent,
    CabangComponent,
    SatkerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    AppRoutingModule,


    DxButtonModule,
    DxDataGridModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
platformBrowserDynamic().bootstrapModule(AppModule);
