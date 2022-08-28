import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { firstValueFrom, Observable, of, switchMap, isEmpty } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User | null | undefined> = new Observable<
    User | null | undefined
  >();

  constructor(
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    public afs: AngularFirestore // Inject Firestore service
  ) {
    console.log('init ', this.user$);
    if (this.user$.pipe(isEmpty())) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap((usr) => {
          if (usr) {
            if (!usr.isAnonymous) {
              //console.log('Not anonymous');
              //user is authenticated
              return this.afs.doc<User>(`users/${usr.uid}`).valueChanges();
            } else {
              return new Promise<User>((res, rej) => {
                let ur: User = new User(Role.Visitor);
                console.log('ur is ', ur);
                res(ur);
              });
            }
          } else {
            return of(null);
          }
        })
      );
    }
  }

  getUser(): Promise<User | null | undefined> {
    const ur = firstValueFrom(this.user$);
    if (ur) {
      return ur;
    } else {
      return new Promise<User | null | undefined>((res, rej) => {
        res(null);
      });
    }
  }

  anonymousLogin() {
    this.afAuth
      .signInAnonymously()
      .then(() => {
        console.log('Anonymous sign in sucess');
      })
      .catch(() => {
        console.log('Error signing in anony user');
      });
  }

  googleSignin() {
    return this.authLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async authLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.updateUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  async updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    userRef.get().subscribe({
      next: (oldData) => {
        if (oldData && user.uid === oldData.get('uid')) {
          return userRef.set({ last_login: Timestamp.now() }, { merge: true });
        } else {
          //new user then create data entry in firestore
          const { uid, displayName, email } = user;
          return userRef.set(
            {
              uid,
              displayName,
              email,
              last_login: Timestamp.now(),
              role: Role.User,
            },
            { merge: true }
          );
        }
      },
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      console.log('Sign out success');
    });
  }
}
