import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';
  user;

  constructor(public auth: AuthService) {
    auth.user.subscribe(user => this.user = user);
  }

  doSomething(): void {
    console.log("Doing something...");
    console.log(this.user);
  }
}
