import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
        private auth: AngularFireAuth,
        private firestore: AngularFirestore
        ) { }

  initAuthListener = () => this.auth.authState.subscribe( fuser => console.log(fuser));

  createUser = ({nombre, email, password} ) =>
      this.auth.createUserWithEmailAndPassword(email, password)
          .then( ({user}) => this.firestore.doc(`${user.uid}/usuario`).set( {...new Usuario( user.uid, nombre, email) }) );

  login = ({ email, password } ) => this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  isAuth = () => this.auth.authState.pipe( map( fbUser => fbUser != null ) );
}
