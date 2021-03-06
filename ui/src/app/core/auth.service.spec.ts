import { TestBed, inject, async, tick, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from './auth.guard';
import { StocksComponent } from '../stocks/stocks.component';
import { AddStockComponent } from '../stocks/add-stock/add-stock.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core.module';
import { StockTypePipe } from '../pipes/stock-type.pipe';

describe('AuthService', () => {

  let ngFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
  let ngFirestoreDocumentSpy = jasmine.createSpyObj('AngularFirestoreDocument', ['valueChanges', 'set']);

  interface User {
    uid: string
  }
  let authState: User = { uid: '123' };

  const testUser = {
    uid: '123',
    email: 'test@email.com',
    displayName: 'Joe Blogs',
    photoURL: 'http://photo.url/'
  };

  let testUserPromise = Promise.resolve({ 'user': testUser });
  let signoutPromise = Promise.resolve();

  const mockAngularFireAuth = {
    auth: jasmine.createSpyObj('auth', ['signInWithPopup', 'signOut']),
    authState: of(authState)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: ngFirestoreSpy },
        AuthGuard
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        CoreModule
      ],
      declarations: [
        UserProfileComponent,
        LoginComponent,
        StocksComponent,
        AddStockComponent,
        StockTypePipe
      ]
    });

    ngFirestoreSpy.doc.and.returnValue(ngFirestoreDocumentSpy);
    ngFirestoreDocumentSpy.valueChanges.and.returnValue(of(testUser));
    mockAngularFireAuth.auth.signInWithPopup.and.returnValue(testUserPromise);
    mockAngularFireAuth.auth.signOut.and.returnValue(signoutPromise);
  });

  it('should set user from service', inject([AuthService], (service: AuthService) => {
    service.user.subscribe(user => {
      expect(user).toEqual(testUser);
      expect(ngFirestoreSpy.doc).toHaveBeenCalledWith('users/123');
      expect(ngFirestoreDocumentSpy.valueChanges).toHaveBeenCalled();
    });
  }));

  it('user should be signed in', inject([AuthService], fakeAsync((service: AuthService) => {
    service.googleLogin();
    testUserPromise.then(() => {
      expect(ngFirestoreSpy.doc).toHaveBeenCalledWith('users/123');
      expect(ngFirestoreDocumentSpy.set).toHaveBeenCalledWith(testUser, { merge: true });
      var router = TestBed.get(Router);
      tick();
      expect(router.location.path()).toBe('/user-profile');
    });
  })));

  it('user should be signed out', inject([AuthService], fakeAsync((service: AuthService) => {
    service.signOut();

    signoutPromise.then(() => {
      var router = TestBed.get(Router);
      tick();
      expect(router.location.path()).toBe('/');
    });
  })));

  describe('no auth available', () => {
    beforeEach(() => {
      ngFirestoreSpy.doc.calls.reset();
      mockAngularFireAuth.authState = of(null);
    });

    it('user is not signed in', inject([AuthService], (service: AuthService) => {
      service.user.subscribe(user => {
        expect(user).toEqual(null);
      });
      expect(ngFirestoreSpy.doc).not.toHaveBeenCalled();
    }));
  });
});
