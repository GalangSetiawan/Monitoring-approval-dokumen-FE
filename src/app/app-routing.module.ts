import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// add component
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterppkComponent } from './components/masterppk/masterppk.component';
import { SatkerComponent } from './components/satker/satker.component';
import { TemuanbpkComponent } from './components/temuanbpk/temuanbpk.component';
import { TemuaninspektoratComponent } from './components/temuaninspektorat/temuaninspektorat.component';
import { BlogComponent } from './components/blog/blog.component';
import { PrintreportComponent } from './printreport/printreport.component';

// add component






  const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'register', component: SignupComponent }, 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'masterppk', component: MasterppkComponent },
    { path: 'satker', component: SatkerComponent },
    { path: 'temuanbpk', component: TemuanbpkComponent },
    { path: 'temuaninspektorat', component: TemuaninspektoratComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'printdokumen', component: PrintreportComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
