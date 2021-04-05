import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filtrosValidos, setFilter } from '../../filters/filter.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos;
  filtros: filtrosValidos[] = ['todos','completados','pendientes'];
  pendientes = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      this.store.subscribe( ({filtro, todos}) => {
        this.filtroActual = filtro;
        this.pendientes   = todos.filter( todo => !todo.completado).length;
      });
  }

  changeFilter = ( filtro: filtrosValidos ) => this.store.dispatch( setFilter( { filtro} ) );

  clearCompleted = () => this.store.dispatch( limpiarCompletados() );

}
