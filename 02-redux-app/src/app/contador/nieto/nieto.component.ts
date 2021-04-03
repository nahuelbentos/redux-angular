import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { reset } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.scss']
})
export class NietoComponent implements OnInit {

  contador: number = 0;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {


    this.store.select('contador').subscribe( contador => this.contador = contador);
  }

  reset = () =>  this.store.dispatch( reset() );
}
