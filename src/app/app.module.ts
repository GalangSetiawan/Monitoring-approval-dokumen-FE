import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth.interceptor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRoutingModule } from './app-routing.module';


import { EscapeHtmlPipe } from './shared/keep-html.pipe';


import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import {
  DxHtmlEditorComponent,
  DxHtmlEditorModule,
  DxPopupComponent,
  DxPopupModule,DxTemplateModule
} from 'devextreme-angular';


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
import { TemuanbpkComponent } from './components/temuanbpk/temuanbpk.component';
import { TemuaninspektoratComponent } from './components/temuaninspektorat/temuaninspektorat.component';
import { BlogComponent } from './components/blog/blog.component';
import { Tidaklanjutv2Component } from './components/tidaklanjutv2/tidaklanjutv2.component';






@NgModule({
  declarations: [
    AppComponent,
    EscapeHtmlPipe,
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
    TemuanbpkComponent,
    TemuaninspektoratComponent,
    BlogComponent,
    Tidaklanjutv2Component,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    AppRoutingModule,


    DxButtonModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    DxPopupModule,
    DxTemplateModule
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
