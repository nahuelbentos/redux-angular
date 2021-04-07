import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

import * as ui from '../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tipo: string = 'ingreso';

  isLoading: boolean = false;
  uiSubscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ({isLoading}) => this.isLoading = isLoading );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  save = () => {

    this.store.dispatch( ui.isLoading() );

    const { descripcion, monto } = this.form.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.createIngresoEgreso( ingresoEgreso )
      .then( () =>  Swal.fire('Registro creado', descripcion, 'success')
        .then( () => {
          this.form.reset();
          this.store.dispatch( ui.stopLoading() );
          }))
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Error', err.message, 'error')
      });
  }

}
