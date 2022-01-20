import React from 'react';
import {Link} from 'react-router-dom';
import style from '../Components/Css/Presentacion.module.css';

export function Presentacion(){
    return(
        <div className={style.app} >
        <Link  to={'/Home'} ><h1>VideoGames</h1></Link>    
        </div>
    );
};

export default Presentacion;    