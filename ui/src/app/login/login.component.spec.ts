import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../core/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpy('AuthService');

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ LoginComponent, { provide: AuthService, useValue: authServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
