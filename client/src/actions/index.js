import axios from "axios";
import { GET_GAMES, GET_DETAIL, GET_GENRES, ORDER_BY_GENRES,
        ORDER_BY_NAME, ORDER_BY_RATING,  GAME_IN_DB, GET_GAME_NAME } from "./types";

export function getGames() {
  return async function (dispatch) {
    const allGames = await axios.get("http://localhost:3001/videogames/default");
    return dispatch({
      type: GET_GAMES,
      payload: allGames.data,
    });
  };
};

export function getGamesName(name){
  return async function(dispatch) {
    const result = await axios.get('http://localhost:3001/videoGames?name=' + name);
    return dispatch({
      type: GET_GAME_NAME,
      payload: result.data
    });
  }
};

export function getDetail(id) {
  return async function(dispatch){
          var result = await axios.get('http://localhost:3001/videoGames/' + id);
          return dispatch({
              type: GET_DETAIL,
              payload: result.data
          });
  }
};

export function getGenres(){
  return async function(dispatch) {
    const result = await axios.get('http://localhost:3001/genres');
    return dispatch({
      type: GET_GENRES,
      payload: result.data
    });
  }
};

export function postNewGame(payload) {
    return async function(dispatch){
        const post = await axios.post('http://localhost:3001/create', payload);
        return post;
    }   
};

export function orderByGenres(payload){
  return {
      type: ORDER_BY_GENRES,
      payload
  }
};

export function orderByName(payload){
  return{
      type: ORDER_BY_NAME,
      payload
  }
};

export function orderByRating(payload){
  return{
      type: ORDER_BY_RATING,
      payload
  }
};

export function orderGameInDB(payload){
  return{
      type: GAME_IN_DB,
      payload
  }
};