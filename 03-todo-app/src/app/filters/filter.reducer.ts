import { createReducer, on } from '@ngrx/store';
import { setFilter, filtrosValidos } from './filter.actions';

export const initialState: filtrosValidos = 'todos';

const _filtroReducer = createReducer(
    initialState,
    on(setFilter, (state:filtrosValidos ,{ filtro }) => filtro ),
);


export const filtroReducer = (state, action) => _filtroReducer(state, action);
