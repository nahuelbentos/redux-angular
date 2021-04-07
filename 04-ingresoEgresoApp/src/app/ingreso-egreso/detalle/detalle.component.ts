import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  subscription: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService :IngresoEgresoService
    ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresosEgresos').subscribe( ({items}) => this.ingresosEgresos = items);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete = (uid: string) =>
    this.ingresoEgresoService.deleteIngresoEgreso(uid)
      .then( () => Swal.fire('Borrado', 'Item borrado', 'success') )
      .catch( err => Swal.fire('Error', err.message, 'error') );

}
