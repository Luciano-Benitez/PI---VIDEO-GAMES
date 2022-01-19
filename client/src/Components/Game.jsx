import React from 'react';
import style from './Css/Game.module.css';

export function Game(e){
    return(
        <div className={style.cts}>
            <h3 className={style.h3} >{e.name}</h3>
            <h3 className={style.h3} >{e.slug}</h3>
            <img className={style.img} src={e.img}  alt='imageGame' width='250px' height='125px' />
            <h4 className={style.h4} >{e.generos}</h4>
        </div>
    );
};

export default Game;
  