import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';

export const initialState: Todo[] =[
  new Todo('Salvar al mundo'),
  new Todo('Matar a Thanos'),
  new Todo('Traje ironman'),
  new Todo('Salvar al mundo devuelta'),
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) =>  [...state, new Todo(texto)] ),
  on(toggle, (state, { id }) =>  state.map( todo => todo.id === id ? {...todo, completado: !todo.completado } : todo ) ),
  on(editar, (state, { id, texto }) =>  state.map( todo => todo.id === id ? {...todo, texto } : todo ) ),
  on(borrar, (state, { id }) =>  state.filter(todo => todo.id !== id ) ),
  on(toggleAll, (state, { completado }) =>  state.map( todo => ({...todo, completado }) ) ),
  on(limpiarCompletados, (state) =>  state.filter( todo => !todo.completado ) ),

);

export const todoReducer = (state, action) =>   _todoReducer(state, action);
