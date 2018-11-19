import { TestBed, async, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {

  const user = {
    uid: '123',
    email: 'test@email.com',
    displayName: 'Joe Blogs',
    photoURL: 'http://photo.url/'
  };

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);
    authServiceSpy.user = of(user);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
        RouterTestingModule,
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
