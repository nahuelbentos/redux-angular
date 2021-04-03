import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as actions from './contador/contador.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redux-app';
  contador: number;

  constructor( private store: Store<AppState>) {
    this.contador = 10;

    this.store.select('contador').subscribe( ( contador ) => this.contador = contador )

  }

  incrementar = () => this.store.dispatch( actions.incrementar() )

  decrementar = () => this.store.dispatch( actions.decrementar() );

}
