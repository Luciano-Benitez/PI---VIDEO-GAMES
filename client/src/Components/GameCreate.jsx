import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {postNewGame} from '../actions/index';
import style from '../Components/Css/Create.module.css';

function validate (state){
    let errors = {};
    if(!state.name){
      errors.name = '¡Se requiere asignar un nombre!';
    } else if(!state.fecha){
      errors.fecha = '¡Se requiere asignar una fecha!';
    } else if(!state.descripcion){
        errors.descripcion = '¡Se requiere asignarle una descripcion!';
    } else if(state.rating !== null ){
        errors.rating = '¡Se requiere asignarle un rating!';
    } /* else if(!state.plataformas){
        errors.plataformas = '¡Se requiere asignarle plataformas!';
    } else if(!state.generos){
        errors.generos = '¡Se requiere asignarle generos!';
    } */
    return errors;
};

export function GameCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = React.useState({});
    const [state, setState] = React.useState({
        name: '',
        fecha: '',
        descripcion: '',
        rating: '',
        plataformas: '', 
        generos: [],
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
          }));
    };

    function checkRating(e){
        if(e.target.checked){
            setState({
                ...state,
                rating:  e.target.value
            })
        }
    };

    function checkPlataform(e){
        if(e.target.checked){
            setState({
                ...state,
                plataformas: e.target.value
            })
        }
    };

    function checkGenres(e){
        if(e.target.checked){
            setState({
                ...state,
                generos: [e.target.value]
            })
        }
    };

    function handleSubmit(e){
        if(!state.name || !state.fecha || !state.rating || !state.plataformas || !state.generos.length || !state.descripcion){
            e.preventDefault();
            alert('¡Debe llenar todos los campos para poder crear un nuevo Juego!');
        } else{
            e.preventDefault();
            dispatch(postNewGame(state));
            alert('¡El Juego fue creado con exito!');
            setState({name: '', fecha: '', rating:'', plataformas: '', generos: [], descripcion: ''});
            history.push('/home');
        }
    };
    console.log('state: ', state);
    console.log('errors: ', errors);

    return(
        <div className={style.all} >
            <h2  className={style.h2} >¡Creá un Juego!</h2>
            <Link to={'/home'}><button className={style.button} >Volver</button></Link>
            <form onSubmit={handleSubmit} >
                <label className={style.label} >Nombre:
                <input type="text" name="name" value={state.name} onChange={handleChange} />
                </label>
                {errors.name&&(
                <p>{errors.name}</p>
                )}
                
                <label className={style.label} >Fecha:
                <input  type="text" name="fecha" value={state.fecha} onChange={handleChange} />
                </label>
                {errors.fecha&&(
                <p>{errors.fecha}</p>
                )}

                <label className={style.descrip} >Descripcion:
                <input type="textarea" name="descripcion" value={state.descripcion} onChange={handleChange} />
                </label>
                {errors.descripcion&&(
                <p>{errors.descripcion}</p>
                )}

                <div className={style.label} >
                <p>Rating: </p>
                <p>1<input type="checkbox"  value={'1'} onChange={checkRating} /></p>
                <p>3<input type="checkbox"  value={'3'} onChange={checkRating} /></p>
                <p>5<input type="checkbox"  value={'5'} onChange={checkRating} /></p>
                <p>7<input type="checkbox"  value={'7'} onChange={checkRating} /></p>
                <p>10<input type="checkbox"  value={'10'} onChange={checkRating} /></p>
                </div>
                {errors.rating&&(
                <p>{errors.rating}</p>
                )}
                
                
                <div className={style.label} >
                <p>Plataformas: </p>
                <p>PlayStation<input type="checkbox"  value={'PlayStation'} onChange={checkPlataform} /></p>
                <p>PC<input type="checkbox"  value={'PC'} onChange={checkPlataform} /></p>
                <p>Xbox<input type="checkbox"  value={'Xbox'} onChange={checkPlataform} /></p>
                <p>Nintendo<input type="checkbox"  value={'Nintendo'} onChange={checkPlataform} /></p>
                <p>Apple Macintosh<input type="checkbox"  value={'Apple Macintosh'} onChange={checkPlataform} /></p>
                <p>Linux<input type="checkbox"  value={'Linux'} onChange={checkPlataform} /></p>
                <p>Android<input type="checkbox"  value={'Android'} onChange={checkPlataform} /></p>
                <p>iOS<input type="checkbox"  value={'iOS'} onChange={checkPlataform} /></p>
                </div>
                {errors.plataformas&&(
                <p>{errors.plataformas}</p>
                )}

                <div className={style.genero} >
                <p  >Generos: </p>
                <p>Action<input type="checkbox"  value={'Action'} onChange={checkGenres} /></p>
                <p>Indie<input type="checkbox"  value={'Indie'} onChange={checkGenres} /></p>
                <p>Adventure<input type="checkbox"  value={'Adventure'} onChange={checkGenres} /></p>
                <p>RPG<input type="checkbox"  value={'RPG'} onChange={checkGenres} /></p>
                <p>Strategy<input type="checkbox"  value={'Strategy'} onChange={checkGenres} /></p>
                <p>Shooter<input type="checkbox"  value={'Shooter'} onChange={checkGenres} /></p>
                <p>Casual<input type="checkbox"  value={'Casual'} onChange={checkGenres} /></p>
                <p>Simulation<input type="checkbox"  value={'Simulation'} onChange={checkGenres} /></p>
                <p>Puzzle<input type="checkbox"  value={'Puzzle'} onChange={checkGenres} /></p>
                <p>Arcade<input type="checkbox"  value={'Arcade'} onChange={checkGenres} /></p>
                <p>Platformer<input type="checkbox"  value={'Platformer'} onChange={checkGenres} /></p>
                <p>Racing<input type="checkbox"  value={'Racing'} onChange={checkGenres} /></p>
                    <div className={style.genero2} >
                    <p>Massively Multiplayer<input type="checkbox"  value={'Massively Multiplayer'} onChange={checkGenres} /></p>
                    <p>Sports<input type="checkbox"  value={'Sports'} onChange={checkGenres} /></p>
                    <p>Fighting<input type="checkbox"  value={'Fighting'} onChange={checkGenres} /></p>
                    <p>Family<input type="checkbox"  value={'Family'} onChange={checkGenres} /></p>
                    <p>Board Games<input type="checkbox"  value={'Board Games'} onChange={checkGenres} /></p>
                    <p>Educational<input type="checkbox"  value={'Educational'} onChange={checkGenres} /></p>
                    <p>Card<input type="checkbox"  value={'Card'} onChange={checkGenres} /></p>
                    </div>
                </div>
                {errors.generos&&(
                <p>{errors.generos}</p>
                )}


                <button className={style.create} type="submit">¡Crear Juego!</button>
            </form>
        </div>
    );
};

export default GameCreate;    