import React from 'react';
import style from './Css/Game.module.css';

export function Game({name, img, generos, slug }){
    return(
        <div className={style.cts} >
            <h3 className={style.h3} >{name}</h3>
            <h3 className={style.h3} >{slug}</h3>
            <img className={style.img} src={img}  alt='imageGame' width='250px' height='125px' />
            <h4 className={style.h4} >{generos}</h4>
        </div>
    );
};

export default Game;
  