import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] CargarUsuarios ');

export const cargarUsuariosSuccess = createAction(
  '[Usuarios] CargarUsuariosSuccess ',
  props<{usuarios: Usuario[]}>()
  );

export const cargarUsuariosError = createAction(
  '[Usuarios] CargarUsuariosError ',
  props<{payload: any}>()
  );
