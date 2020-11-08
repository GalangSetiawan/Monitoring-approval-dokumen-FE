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
  DxPopupModule,DxTemplateModule,
  DxChartModule, DxSelectBoxModule
} from 'devextreme-angular';



import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterppkComponent } from './components/masterppk/masterppk.component';
import { SatkerComponent } from './components/satker/satker.component';
import { TemuanbpkComponent } from './components/temuanbpk/temuanbpk.component';
import { TemuaninspektoratComponent } from './components/temuaninspektorat/temuaninspektorat.component';
import { BlogComponent } from './components/blog/blog.component';
import { PrintreportComponent } from './printreport/printreport.component';






@NgModule({
  declarations: [
    AppComponent,
    EscapeHtmlPipe,
    SignupComponent,
    SidebarComponent,
    DashboardComponent,
    MasterppkComponent,
    SatkerComponent,
    TemuanbpkComponent,
    TemuaninspektoratComponent,
    BlogComponent,
    PrintreportComponent,
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
    DxTemplateModule,
    DxChartModule,
    DxSelectBoxModule

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
