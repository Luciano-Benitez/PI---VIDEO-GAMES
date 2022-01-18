import React from 'react';

export function Paginado({allGames, gamePerPage, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allGames/gamePerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav >
            {
                pageNumbers?.map(number => (
                    <button key={number} onClick={() => paginado(number)} >{number}</button>
                ))
            }
        </nav>
    )
};

export default Paginado;