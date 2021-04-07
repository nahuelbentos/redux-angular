import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from '../app.reducer';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription: Subscription;
  private _user: Usuario;

  get user(){ return {...this._user} };

  constructor(
        private auth: AngularFireAuth,
        private store: Store<AppState>,
        private firestore: AngularFirestore
        ) { }

  initAuthListener = () => this.auth.authState.subscribe( (fuser) => {
    if(fuser){

      this.subscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) => {
          const { nombre, email } = firestoreUser;
          const user = Usuario.fromFirebase( firestoreUser );
          this._user = user;
          this.store.dispatch( setUser({ user }) );
        });
    } else {
      this._user = null;
      this.subscription?.unsubscribe();
      this.store.dispatch( unSetUser() );
      this.store.dispatch( unSetItems() );

    }
  });

  createUser = ({nombre, email, password} ) =>
      this.auth.createUserWithEmailAndPassword(email, password)
          .then( ({user}) => this.firestore.doc(`${user.uid}/usuario`).set( {...new Usuario( user.uid, nombre, email) }) );

  login = ({ email, password } ) => this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  isAuth = () => this.auth.authState.pipe( map( fbUser => fbUser != null ) );
}
