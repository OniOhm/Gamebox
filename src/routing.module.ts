import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { SplashComponent } from './app/splash/splash.component';


const routes: Routes = [

  {path:'/splash', component: SplashComponent},
  {path: '', redirectTo: '/splash', pathMatch:'full'}


]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class RoutingModule { }
