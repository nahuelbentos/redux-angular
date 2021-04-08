import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const cargarUsuario = createAction(
  '[Usuario] CargarUsuario ',
  props<{id: string}>()
);

export const cargarUsuarioSuccess = createAction(
  '[Usuario] CargarUsuarioSuccess ',
  props<{usuario: Usuario}>()
  );

export const cargarUsuarioError = createAction(
  '[Usuario] CargarUsuarioError ',
  props<{payload: any}>()
  );
