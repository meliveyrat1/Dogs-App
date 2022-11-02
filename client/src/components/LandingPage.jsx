import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/LandingPage.css';
import DoggyPedia from "../styles/DoggyPedia.mp4";

export default function LandingPage(){
    return(
        
        <div className='landingContainer'>
            <video src={DoggyPedia} autoPlay loop/>
            <div className='title'>
                <h1>DoggyPedia</h1>
            </div>
            
        <Link to='/home'>
        <button className='landingButton'>
            <h1>
                <span id="span1"></span>
                <span id="span2"></span>
                <span id="span3"></span>
                <span id="span4"></span>
                <span>HOME</span>
            </h1>
            
        </button>
        </Link>
    </div>
    )
}