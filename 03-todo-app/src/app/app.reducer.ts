import { ActionReducerMap } from "@ngrx/store";

import { Todo } from "./todos/models/todo.model";
import { filtrosValidos } from './filters/filter.actions';
import { todoReducer } from './todos/todo.reducer';
import { filtroReducer } from './filters/filter.reducer';

export interface AppState {
  todos: Todo[],
  filtro: filtrosValidos
}


export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro: filtroReducer
}
