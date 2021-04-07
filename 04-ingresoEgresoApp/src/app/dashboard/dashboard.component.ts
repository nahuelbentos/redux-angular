import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  ingresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService

    ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth').pipe(filter( auth => auth.user != null ))
      .subscribe( ({user}) => {
        this.ingresosSubscription = this.ingresoEgresoService
            .initIngresosEgresosListener( user.uid)
            .subscribe(ingresosEgresosFB => this.store.dispatch( setItems({ items: ingresosEgresosFB }) ) );
      });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.ingresosSubscription?.unsubscribe();
  }

}
