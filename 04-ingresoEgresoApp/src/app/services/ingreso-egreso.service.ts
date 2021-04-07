import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
     ) { }

  createIngresoEgreso = (ingresoEgreso: IngresoEgreso) =>
    this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});

  initIngresosEgresosListener = (uid: string) =>
    this.firestore.collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges()
        .pipe( map( snapshot => snapshot.map( doc =>  ({ uid: doc.payload.doc.id, ...doc.payload.doc.data() as any }) )) );

  deleteIngresoEgreso = (uidItem: string) => this.firestore.doc(`/${this.authService.user.uid}/ingresos-egresos/items/${uidItem}`).delete();




}

