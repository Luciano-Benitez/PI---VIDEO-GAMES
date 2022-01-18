import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {getDetail} from '../actions/index';
import style from '../Components/Css/Detail.module.css';

export  function Detail(props){
    const {id} = props.match.params;
    const dispatch = useDispatch();
    
    var allDetail = useSelector((state) => state.detail[0]);
    console.log('allDetail: ', allDetail);
    
    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch,id]);

    return(
        <div className={style.app}>
            <Link to={'/home'}><button  className={style.button}  >Volver</button></Link>
                
            {
                allDetail?
                <div>
                    <h1>{allDetail.name}</h1>
                    <img float='right' src={allDetail.img} width='450px' height='225px' alt='img'/>
                    <h3>ID: <h4>{allDetail.id}</h4></h3>
                    <h3>Fecha: <h4>{allDetail.fecha}</h4></h3>
                    <h3>Rating: <h4>{allDetail.rating}</h4></h3>
                    <h3>Plataformas: <h4>{allDetail.plataformas}</h4></h3>
                    <h3>Generos: <h4>{allDetail.generos}</h4></h3>
                    <h3>Descripción: <h4 dangerouslySetInnerHTML={{ __html: allDetail.descripcion, }}/></h3>
                </div> :  <p>loading...</p>
            }
                
        </div>
    );
};

export default Detail;
  