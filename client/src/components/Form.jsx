import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {  getTemperaments, postDog } from "../redux/actions";
import '../styles/Form.css';


const validate = (input)=>{
    let errors ={};//genero un objeto de errores
    if(!input.name) errors.name = 'Name is required'//si no hay un input(el estado local)entonces en mi obj errors.name voy a poner un str de que se requiere un nombre
    if(input.name.length < 3 || input.name.length > 30) errors.name = 'Name must contain between 3 and 30 characters'
    if(!/^[a-zA-Z\s]+$/.test(input.name)) errors.name = 'Invalid name, must only contain letters'
    if(!input.temperaments) errors.temperaments = 'Chosse a temperament'
    if(input.temperaments > 6) errors.temperaments = 'You cant select moren than 7 temperaments'
    if(input.weightMin < 1   )errors.weightMin = 'Must be a positive number'
    if(input.weightMin > 70 )errors.weightMin = 'Min value must be less than 70 kg'
    if(input.weightMin > input.weightMax)errors.weightMin = 'Min value must be less than Max value'
    if(input.weightMax < 1 )errors.weightMax = 'Value must be a positive number'
    if(input.weightMax > 100)errors.weightMax = 'Max value must be less than 100 kg'
    if(input.weightMax < input.weightMin)errors.weightMax = 'Max value must be higher than Min value'
    if(input.heightMin < 1 )errors.heightMin = 'Value must be a positive number'
    if(input.heightMin > 100)errors.heightMin='Min value must be less than 100 kg'
    if(input.heightMin > input.heightMax)errors.heightMin = 'Min value must be less than Max value'
    if(input.heightMax < 1 )errors.heightMax = 'Value must be a positive number'
    if(input.heightMax > 150)errors.heightMax='Max value must be less than 150 kg'
    if(input.heightMax < input.heightMin)errors.heightMax = 'Max value must be higher than Min value'
    if(input.lifespan < '1') errors.lifespan = 'The age must be a positive number '
    if(input.lifespan > '80')errors.lifespan = 'the value must be less than 80 years'
    
   

    return errors
}

export default function Form(){
    const dispatch = useDispatch();
    const history = useHistory();// metodo de router que lo que hace es redirigirme a la ruta que yo le diga
    const temperaments = useSelector((state) => state.temperaments) //me creo esos temperamentos, como me traigo ese estado?con useselector. le paso un state y le digo traeme todos los temperam
    const [errors, setErrors] = useState({});//entonces en mi estado local genero una const para los errores que va a ser un obj vacío
    const [input, setInput] = useState({ //para crear mi dog voy a necesitar un form, ese form tengo que guardarlo en un estado,un input, un setinput=usestate con un objeto con la info  que necesita el post
        name:'',
        weightMin:0,
        weightMax:0,
        heightMin:0,
        heightMax:0,
        lifespan:'0',
        image:'',
        temperaments:[]
    })

    useEffect(()=>{
        dispatch(getTemperaments());
    },[dispatch]);

    function handleSelectTemperaments(e){
        setInput({//hace un setinput que es el estado donde voy a guardar todo
            ...input,
            temperaments:input.temperaments.includes(e.target.value) ? input.temperaments : [...input.temperaments, e.target.value]//le paso lo que ya habia en input.temperam y concateno el e.targetvalue, va  air guardando en un arreglo todo lo que yo guarde en el select todo lo q vaya seleccionando, cada vex que hago un clik en el select lo va guardando 
        })
    }

    function handleChange(e){ //va  a ir manejando cada vex que cambie,se modifique el input
        e.preventDefault();
        setInput({ //tengo  que ir guardando las cosas que el usuario va escribiendo en el input en mi estado input
            ...input, //a mi estado input ademas de lo que tiene osea trae todo loq ue ya tenias
            [e.target.name]:e.target.value//agregale el target value de lo que esté modificando cuando el cliente esté escibiendo en el input
        })//ese name es el name del objeto de arriba,que es el estado que se va a modificar. el e.target.value va a tomar losminput del obj de arriba y los va a ir modificando dependiendo de lo que eté escrito
        //entonces a este handle se lo pasamos a todos los inputs en el renderizado en cada onChange
        //este handle es dinamico, el name es dinamico va, va a setearse dependiendo en el target en que yo esté en ese momento,por ej lifespan,image,etc y va a ir cambiando con el valor que el client va poniendo,va cambiando  
        setErrors(validate({//primero hago de setear el input, y despues le digo seteame el estado errores pasandole la función validate y lo renderizo abajo en cada input,abajo de onchange(handlechange)en el caso de que suceda
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postDog(input))//como payload le paso el input
        alert('Dog Created succesfully')
        history.push('/home')//cuando termines de hacer todo esto, hace un history.push y llevame al home xq ya se creó el dog
    }//se lo paso al form con onSubmit

    function handleDelete(e){//busco el elemento(t) en el array que coincida y lo borro,
        e.preventDefault()
        setInput({
            ...input,//siempre traigo el input anterior,osea todo loq ue esta en el obj de arriba,porque si no lo pisa y rompe todo
            temperaments: input.temperaments.filter(t=>t !== e.target.id)//filtrame todo lo que no sea ese elemento, me  va a devolver un estado nuevo sin ese elemento que yo clikie(me va a devolver todo lo que no clikie)
        })
    }

    return (
        <div className="form-container">
            <div>
                <h1 className="logoNameForm">DoggyPedia</h1>
            </div>
          <div className="created-card">
           
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="texto">Name</label>
                    <input className="input-name"
                    type= 'text'
                    placeholder='name...'
                    value= {input.name}
                    name= 'name'
                    onChange={handleChange}
                    />
                    {errors.name && (//pregunto si está errors.name y si está hago un parrafo con ese error(errors.name) 
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Image</label>
                    <input
                    className="input-name"
                    type= 'text'
                    placeholder="url..."
                    value= {input.image}
                    name= 'image'
                    onChange={handleChange}
                    />
                     {errors.image && (
                        <p className="error">{errors.image}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Height Min </label>
                    <input
                    className="input-form"
                    type= 'number'
                    placeholder="height min ..."
                    value= {input.heightMin}
                    name= 'heightMin'
                    min='1'
                    max='70'
                    step={1}
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.heightMin && (
                        <p className="error">{errors.heightMin}</p>
                    )}
                </div>
                <div className="label">
                    <label className="texto">Height Max </label>
                    <input
                    className="input-form"
                    type= 'number'
                    placeholder="height max..."
                    value= {input.heightMax}
                    name= 'heightMax'
                    min='1'
                    max='100'
                    step={1}
                    onChange={handleChange}
                    />
                    {errors.heightMax && (
                        <p className="error">{errors.heightMax}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Weight Min </label>
                    <input
                    className="input-form"
                    type= 'number'
                    placeholder="weight min..."
                    value= {input.weightMin}
                    name= 'weightMin'
                    onChange={handleChange}
                    />
                    {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                    )}
                </div>
                <div>
                    <label className="texto">Weight Max </label>
                    <input
                    className="input-form"
                    type= 'number'
                    placeholder="weight max..."
                    value= {input.weightMax}
                    name= 'weightMax'
                    onChange={handleChange}
                    />
                    {errors.weightMax && (
                        <p className="error">{errors.weightMax}</p>
                    )}
                </div>
                <div>
                    <label className="lifeSpan">Life Span </label>
                    <input
                    className="input-form-lifeSpan"
                    type= 'number'
                    placeholder="life span..."
                    value= {input.lifespan}
                    name= 'lifespan'
                    onChange={handleChange}
                    />
                    {errors.lifespan && (
                        <p className="error">{errors.lifespan}</p>
                    )}
                </div>
                
                <div>
                    <label  className="temps-div">Temperaments </label>
                    <select className="select-form" onChange={handleSelectTemperaments} >
                        {temperaments?.map((t)=>(<option value={t.name}>{t.name}</option>)//tengo que acceder al nombre, con el value, y en lo que renderizo le paso lo mismo t.name, entonces voy a la pagina y ya tengo todos los temperam
                        )}
                    </select>
                        {errors.temperaments && (
                            <p className="error">{errors.temperaments}</p>
                        )}
                    <ul className="list">
                        {input.temperaments.map(t=>(//mi estado local que va a tener todos los temperam que vaya guardando,lo mapeo(siempre que haga un map tengo que hacer un div abajo)
                            //renderizame una lista con el elemento(t) y además un botón que cuando yo le haga click me ejecute la funcion handledelete
                            <li className="x-button" key={t} >
                                {t}
                                <button  className= "button" id={t} type='button' onClick={handleDelete} >X</button>
                            </li>
                        ))}
                        {errors.temperaments && (
                            <p className="error">{errors.temperaments}</p>
                        )}
                    </ul>
                    <div className="submit-form">
                        <button className="submit-button" type='submit'>Submit</button>
                    </div>
                </div>
            </form>
          </div>
          <div className="back-container">
            <Link to= '/home'><button className="button-back">Back </button></Link>
            </div>
    </div>
  )
}
//todo lo que se envuelve en un Link va a ser para redireccionarme a donde quiero ir