import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import {getGames, getGenres, orderByGenres, orderByName, orderGameInDB, orderByRating} from '../actions/index';

import {Game} from '../Components/Game';
import {Paginado} from '../Components/Paginado';
import {SearchBar} from '../Components/SearchBar';
import style from './Css/Home.module.css';

export function Home(){
    const dispatch = useDispatch();

    const[order, setOrder] = React.useState('');
    const allGames = useSelector(state => state.games);
    const [currentPage, setCurrentPage] = React.useState(1)
    const [gamePerPage, setGamePerPage] = React.useState(15)
    const indexOfLastCountry = currentPage * gamePerPage
    const indexOfFirstCountry = indexOfLastCountry - gamePerPage
    const currentGames = allGames?.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    };

    useEffect(() => {
        dispatch(getGames());
    },[dispatch]);

    useEffect(() => {
        dispatch(getGenres());
    },[dispatch]);

    function Recargar(e){
        dispatch(getGames());
        setCurrentPage(1);
    };

    function handleSortGenres(e){
        dispatch(orderByGenres(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    function handleSortName(e) {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    function handldeSortRating(e){
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    function createdInDB(e){
        dispatch(orderGameInDB(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordernado ${e.target.value}`);
    };

    return(
        <div className={style.back} >
            <div className={style.all} >
                <div className={style.recargar} ><button onClick={e=>Recargar(e)} >Recargar Pagina</button></div>
                <div className={style.search} ><SearchBar/></div>
                <div className={style.create} ><Link to={'/GameCreate'} color='red' ><h3>¡Crear un nuevo Juego!</h3></Link></div>
            </div>
            <hr/>
            <div className={style.paginado} >
                <Paginado
                    gamePerPage={gamePerPage}
                    allGames={allGames.length}
                    paginado={paginado}
                />
            </div>
            <div className={style.filter} >
            <div className={style.az} ><label>Filtrar por: <select onChange={e => handleSortName(e)}>
            <option name='asc' value='asc'>A-Z</option>
            <option name='desc' value='desc'>Z-A</option>
            </select></label></div>

            <div className={style.fgeneros} ><label>Filtrar por Generos: <select onChange={e => handleSortGenres(e)}>
            <option value='all'> -- Select --</option>
            <option value="Action">Action</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Racing">Racing</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
            </select></label></div>

            <div className={style.rating} ><label>Filtrar por Rating: <select onChange={e => handldeSortRating(e)}>
            <option  value=''>Menor a Mayor</option>
            <option  value='Mayor_Menor'>Mayor a Menor</option>
            </select></label></div>

            <div className={style.gamesCreated} ><label>Filtrar juegos Creados: 
            <input type='checkbox' value={'DB'} onChange={e => createdInDB(e)} /></label>
            </div>
            </div>
            
            {
                currentGames?.map(e => {
                    return (
                        <Link to={'/game/' + e.id} key={e.id} >
                        <Game name={e.name} img={e.img} generos={e.generos} slug={e.slug}  />
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default Home;    