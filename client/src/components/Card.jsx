import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';
import img from '../styles/Doggy.jpg'

export default function Card ({image, name, temperaments, weightMin, weightMax, id}){
  
    return (
      <Link to={`/detail/${id}`}>
       <div className='card-container'>
        <div className='card'>
          <div className='background-top-row'>
            <h2 className='info'>{name}</h2>
          </div>
          <div>
            <h3 className='temp-title'>Temperaments</h3>
            </div>
            <div className='temps'>
             {temperaments && typeof temperaments[0] === 'object'? temperaments?.map(t=>(
            t.name + ', '
            )):temperaments?.join(', ')}
            </div>
            <br/>
              <img className="img-dog" src={image? image : img} alt={`${name}`}   />
            <div className='weight'>
            <h4>Min Weight: {weightMin} kg</h4>
            <h4>Max Weight: {weightMax} kg</h4>
            
            </div>
        </div>
       </div>
      </Link>
    )
}