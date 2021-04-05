import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export const setFilter = createAction(
  '[Filter] SetFilter',
  props<{filtro: filtrosValidos}>()
  );

