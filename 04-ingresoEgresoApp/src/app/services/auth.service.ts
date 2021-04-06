import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription: Subscription;

  constructor(
        private auth: AngularFireAuth,
        private store: Store<AppState>,
        private firestore: AngularFirestore
        ) { }

  initAuthListener = () => this.auth.authState.subscribe( ({uid}) => {
    if(uid){
      // const user = Usuario.fromFirebase(uid, nombre, email);
      this.subscription = this.firestore.doc(`${uid}/usuario`).valueChanges()
        .subscribe( ({ nombre, email}) => this.store.dispatch( setUser({user: new Usuario(uid, nombre, email)}) ))
    } else {
      this.subscription.unsubscribe();
      this.store.dispatch( unSetUser() );

    }
  });

  createUser = ({nombre, email, password} ) =>
      this.auth.createUserWithEmailAndPassword(email, password)
          .then( ({user}) => this.firestore.doc(`${user.uid}/usuario`).set( {...new Usuario( user.uid, nombre, email) }) );

  login = ({ email, password } ) => this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  isAuth = () => this.auth.authState.pipe( map( fbUser => fbUser != null ) );
}
