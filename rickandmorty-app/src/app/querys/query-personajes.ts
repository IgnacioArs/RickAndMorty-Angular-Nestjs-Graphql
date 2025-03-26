import { gql } from '@apollo/client/core';

// Consulta para obtener todos los personajes
export const OBTENER_TODOS_LOS_PERSONAJES = gql`
  query ObtenerTodosLosPersonajes($obtenerPersonajePorIdId: Int!, $nombre: String!, $obtenerOrigenPorIdId: Int!, $obtenerEpisodioPorIdId: Int!) {
    obtenerTodosLosPersonajes {
      id
      name
      status
      species
      type
      gender
      image
      url
      created
      origin {
        name
        url
      }
      location {
        name
        url
      }
      episode
    }
  }
`;

// Consulta para obtener un personaje por ID
export const OBTENER_PERSONAJE_POR_ID = gql`
  query ObtenerPersonajePorId($obtenerPersonajePorIdId: Int!) {
    obtenerPersonajePorId(id: $obtenerPersonajePorIdId) {
      id
      name
      status
      species
      type
      gender
      image
      url
      created
      origin {
        name
        url
      }
      location {
        name
        url
      }
      episode
    }
  }
`;

// Consulta para obtener personajes por nombre
export const OBTENER_TODOS_LOS_PERSONAJES_POR_NOMBRE = gql`
  query ObtenerTodosLosPersonajesPorNombre($nombre: String!) {
    obtenerTodosLosPersonajesPorNombre(nombre: $nombre) {
      id
      name
      status
      species
      type
      gender
      image
      url
      created
      origin {
        name
        url
      }
      location {
        name
        url
      }
      episode
    }
  }
`;

// Consulta para obtener el origen de un personaje por ID
export const OBTENER_ORIGEN_POR_ID = gql`
  query ObtenerOrigenPorId($obtenerOrigenPorIdId: Int!) {
    obtenerOrigenPorId(id: $obtenerOrigenPorIdId) {
      id
      name
      type
      dimension
      residents
      url
      created
    }
  }
`;

// Consulta para obtener un episodio por ID
export const OBTENER_EPISODIO_POR_ID = gql`
  query ObtenerEpisodioPorId($obtenerEpisodioPorIdId: Int!) {
    obtenerEpisodioPorId(id: $obtenerEpisodioPorIdId) {
      id
      name
      air_date
      episode
      characters
      url
      created
    }
  }
`;


