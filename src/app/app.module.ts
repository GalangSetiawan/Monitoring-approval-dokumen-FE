import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EscapeHtmlPipe } from './shared/keep-html.pipe';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterppkComponent } from './components/masterppk/masterppk.component';
import { SatkerComponent } from './components/satker/satker.component';
import { TemuanbpkComponent } from './components/temuanbpk/temuanbpk.component';
import { TemuaninspektoratComponent } from './components/temuaninspektorat/temuaninspektorat.component';
import { BlogComponent } from './components/blog/blog.component';
import { PrintreportComponent } from './printreport/printreport.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { DxPopupModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular';
import { DxChartModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';
import { AuthInterceptor } from './shared/auth.interceptor';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({
  declarations: [
    AppComponent,
    EscapeHtmlPipe,
    SignupComponent,
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
// platformBrowserDynamic().bootstrapModule(AppModule);
