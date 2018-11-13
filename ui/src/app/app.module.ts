import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
