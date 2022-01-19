import {GET_GAMES, GET_DETAIL, POST_CREATE, GET_GENRES,
         ORDER_BY_GENRES, ORDER_BY_NAME, GAME_IN_DB, ORDER_BY_RATING, GET_GAME_NAME} from '../actions/types';
const initialState = {
    allGames: [],
    games: [],
    detail: [],
    genres: [],
};

const reducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_GAMES:
        return {
            ...state,
            allGames: payload,
            games: payload
        };

        case GET_DETAIL:
            return {
                ...state,
                detail: payload
            };
            
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            };

        case POST_CREATE:
            return {
                ...state
            };

        case ORDER_BY_GENRES:
            const allGames = state.allGames
            const filterGenres = payload === 'all' ? allGames : allGames.filter(game => game.generos.includes(payload));
            return{
                ...state,
                games: filterGenres
            };

            case ORDER_BY_NAME:
            const orderbyName = payload === 'asc' ?
            state.games.sort((a,b) => a.name.localeCompare(b.name)) :
            state.games.sort((a,b) => b.name.localeCompare(a.name));
                return{
                    ...state,
                    games:  orderbyName
                };

            case GAME_IN_DB:
            const gamesTotal = state.allGames;
            const createdInDB = payload === 'created'? gamesTotal.filter(game => game.createdInDb) : null;
                return {
                ...state,
                games: createdInDB
                };

            case ORDER_BY_RATING:
                const all = state.games
            const orderbyRating = payload === 'Mayor_Menor' ? all.sort((a,b) => b.rating - a.rating ) :
            all.sort((a,b) => a.rating - b.rating);
            
                return{
                    ...state,
                    games:  orderbyRating
                };

            case GET_GAME_NAME:
                return {
                    ...state,
                    games: payload
                }

        default:
            return state;
    };
};

export default reducer;