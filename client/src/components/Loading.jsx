import React from 'react';
import loading from '../styles/loading-dog.gif';
import '../styles/Loading.css';
export default function Loading(){
    return (
        <div >
            <img className='loading' src={loading} alt='Loading'/>
        </div>
    )
}  