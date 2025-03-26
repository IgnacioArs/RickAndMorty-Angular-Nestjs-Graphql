// src/app/store/reducers/app.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setData, updateData } from './app.actions';  // Importamos las acciones
import { PersonajeFavoritoInterface } from '../interface/Personaje-Favorito-Interface';


export interface AppState {
  data: PersonajeFavoritoInterface | null;
}

export const initialState: AppState = {
  data: null,  // Inicializamos con null o un valor por defecto
};

const _appReducer = createReducer(
  initialState,
  on(setData, (state, { data }) => {
    console.log('Reducer actualizando estado con:', data);
    return { ...state, data };
  }),
  on(updateData, (state, { newData }) => {
    console.log('Reducer actualizando datos con:', newData);
    return {
      ...state,
      data: state.data ? { ...state.data, ...newData } : null, // Actualiza solo los campos modificados
    };
  })
);

export function appReducer(state: AppState | undefined, action: any) {
  return _appReducer(state, action);
}

