// src/app/store/actions/app.actions.ts
import { createAction, props } from '@ngrx/store';
import { PersonajeFavoritoInterface } from '../interface/Personaje-Favorito-Interface';

export const setData = createAction(
  '[App] Set Data',
  props<{ data: PersonajeFavoritoInterface | null }>()
);

export const updateData = createAction(
  '[App] Update Data',
  props<{ newData: any }>()
);


