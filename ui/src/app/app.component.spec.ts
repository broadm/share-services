import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './core/auth.service';
import { of } from 'rxjs';
import { CoreModule } from './core/core.module';

describe('AppComponent', () => {

  const user = {
    uid: '123',
    email: 'test@email.com',
    displayName: 'Joe Blogs',
    photoURL: 'http://photo.url/'
  };

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);
    authServiceSpy.user = of(user);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        AppComponent,
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
        RouterTestingModule,
        CoreModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'ui'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ui');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('App Title');
  }));
  it('user should be set', async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.user).toEqual(user);
  });
});
