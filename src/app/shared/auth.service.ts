import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '@wh-objects/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      roles: {
        admin: false,
        editor: false,
        sponsor: false
      }
    };
    return userRef.set(data, { merge: true });
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'sponsoring'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor', 'sponsoring'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
