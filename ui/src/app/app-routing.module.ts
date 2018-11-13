import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
