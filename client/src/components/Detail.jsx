import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions/index';
import { useEffect } from "react";
import '../styles/Detail.css';
import Loading from "./Loading";
import img from '../styles/Doggy.jpg'
import Home from './Home';

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));//es la forma para acceder al id
        
    },[dispatch])

    const myDog = useSelector((state) => state.detail)//me traigo el detail con el use selector,  pongo state. y el estado detail del reducer

    return (
        <div className="detail-container">
            <div>
            <h1 className="logoName">DoggyPedia</h1>
            </div>
            {
                myDog.length?
                <div className='detail-card'>
                    <div top-row background-top-row>
                    <h1> {myDog[0].name}</h1>{/*como la info del perro me trae con un array accedo a la porpied name poniendo myDog[0].name */}
                    </div>
                    <img src={myDog[0].image ? myDog[0].image : img} alt={myDog[0].name} width='100%' ></img>
                    <article className="article">
                      <h1 className="temp">Temperaments: </h1>
                      <h2 className="temperaments"> {myDog[0].createdInDb === true ? myDog[0].temperaments.map(t => t.name) :  myDog[0].temperaments.join(', ')}</h2>
                      <h3>Weight: {myDog[0].weightMin} - {myDog[0].weightMax}</h3>
                      <h3>Height: {myDog[0].heightMin} - {myDog[0].heightMax}</h3>
                      <h3>Life Span: {myDog[0].life_span}</h3>
                    </article>
                 <Link to= '/home'>
                    <button className="back"><strong>
                        <h1 className="font">Back</h1></strong></button>
                </Link> 
                </div>
                : <Loading/>
            }
        </div>
    )
}
