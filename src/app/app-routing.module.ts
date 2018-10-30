import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';


import { SplashComponent } from './splash/splash.component';
import { LogSignComponent } from './log-sign/log-sign.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth-gaurd.service';


const appRoutes: Routes=[
  {path:'Splash' , component: SplashComponent },
  {path:'LogSign' , component: LogSignComponent},
  {path: 'Dashboard' , component: DashboardComponent ,canActivate: [authGuard]},
  {path:'' , redirectTo:"Splash", pathMatch: 'full'},
  {path:'**' , component: SplashComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  declarations: [
    SplashComponent,
    LogSignComponent,
    
  ]
})
export class AppRoutingModule { }
