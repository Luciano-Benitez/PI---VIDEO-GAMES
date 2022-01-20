import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {getDetail} from '../actions/index';
import style from '../Components/Css/Detail.module.css';

export  function Detail(props){
    const {id} = props.match.params;
    console.log('id: ',id)
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
                    <h3>ID: <p>{allDetail.id}</p></h3>
                    <h3>Fecha: <p>{allDetail.fecha}</p></h3>
                    <h3>Rating: <p>{allDetail.rating}</p></h3>
                    <h3>Plataformas: <p>{allDetail.plataformas}</p></h3>
                    <h3>Generos: <p>{allDetail.generos[0].name}</p></h3>
                    <h3>Descripción: <p dangerouslySetInnerHTML={{ __html: allDetail.descripcion, }}/></h3>
                </div> :  <label className={style.label} >Loading...</label>
            }
                
        </div>
    );
};

export default Detail;
  