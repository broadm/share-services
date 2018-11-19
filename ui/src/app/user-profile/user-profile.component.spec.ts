import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../core/auth.service';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpy('AuthService');

    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [ UserProfileComponent, { provide: AuthService, useValue: authServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
