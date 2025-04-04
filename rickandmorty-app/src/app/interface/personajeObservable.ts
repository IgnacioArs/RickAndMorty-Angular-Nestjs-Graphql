export interface PersonajeObservableInterface {
    nombre: string;
    estado: string;
    especie: string;
    tipo: string;
    genero: string;
    fechaCreacion: string;
}

export const initPersobajeObservable: PersonajeObservableInterface  = {
    nombre: '',
    estado: '',
    especie: '',
    tipo: '',
    genero: '',
    fechaCreacion: '',
}