import React from "react";
import '../styles/Home.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    getDogs, 
    getTemperaments, 
    filterDogsByTemperament, 
    sortByName,  
    sortByWeight,
    filterCreated,
    clearDetail,
    } from "../redux/actions";
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import img from "../styles/Doggy.jpg"




export default function Home() {
    const dispatch = useDispatch();//para despachar las acciones a traves de esta constante
    const allDogs = useSelector((state) => state.dogs); //es lo mismo que hacer mapstatetoprop, con use selector traeme todo lo que esta en el estado de dogs,todo en esta constante,trabajo todo desde ahi
    const allTemperaments = useSelector((state) => state.temperaments);

     //logica del paginado, me creo estados locales
    const [currentPage, setCurrentPage] = useState(1); //primero un estado con la pagina actual,y un estado que me setee la pagina actual, uso un useestate en 1 porque siempre voy a arrancar de mi primer pagina
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8); //cuantos personajes tengo por pagina, en este caso 8
    const indexOfLastDog = currentPage * dogsPerPage; //cons indice del ultimo dog es igual a la pagina actual en donde estoy por(*) la  Cantidad de dogs por pagina. en un comienzo esa contsnte va a ser 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; //me da cero
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);//una const que me gusrde todo lso dogs que voy a tener en cada pag, para eso me traigo todos los dogs,el arreglo del estado,del reducer eñ estado dog donde tiene todos los dogs
    //el slice me corta un arreglo,donde yo le especifique donde,toma una porcion donde yo le indique por parametro. la logica es agrarra el indice del primer dog y el indice del ultimo.
    const [/*_orden*/, setOrden] = useState(''); 
    const paginado = (pageNumber) => { //le paso un numero de la pagina y voy a setear la pag en ese numero de pagina
        setCurrentPage(pageNumber);
    }
     //eluseeffect: me va apermitir manjera ciclos de vida en comp funcionales, me va llenando el estado cuando se monta el componente
    useEffect(() => { //traemos del estado los dogs cuando el componenet se monta
        dispatch(getDogs())//despacho las accion invocada de getdogs, es lo mismo que hacer el mapdispatchtoprops
        dispatch(getTemperaments())
        dispatch(clearDetail())
    }, [dispatch])//el segundo parametro del useeffect,un array vacio,de lo que depende este componentdidmount,ejecutalo siempre y cuando suceda lo que esta dentro del array,ej dipatch

    function handleClick(e) { //al boton refresh le paso una funcion,para manejar el boton
        e.preventDefault();//lo que hace es ,le paso un evento, . Es para que no se me recargue la pág
        dispatch(getDogs())//me lo resetea, y me vuelve a cargar los dogs
        setCurrentPage(1);
    }

    function handleFilterTemperaments(e) {//un handle del filter del temperam, siempre poner nombre acorde
        e.preventDefault(e);//(e es evento) esta funcion es la que yo le voy a pasar al select filter by temp. cuando se modifique ejecutá esta funcion
        dispatch(filterDogsByTemperament(e.target.value))//esat funcion va a despachar la accion que hicimos del filterdogbytemperam y le paso. el payload de la action va a ser el value del imput,lo que escriban ahi. le paso al select el onChange de este handle
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))//el target value es lo que viene del select y en la accion es el payload
        setCurrentPage(1);
        
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);//cuando yo hago el ordenamiento seteame en la primer pagina
        setOrden(e.target.value);//y genero este set orden, me sirve para que cuando yo seteo la pagina(setcurrentpage) modifique el estado local y se renderice para que desde el front me haga el ordenamiento
    }
    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    
    return (//aqui renderizamos,con un div que envuelva todo
        <div>
            {currentDogs.length > 0 ?
        <div className="home">
            <h1 className="logoName">DoggyPedia</h1>
           
            
            <div className="divNB">
                <ul className="navbar">
                    <li className="content-select">
                        <select  className='elementNB' onChange={(e) => handleFilterCreated(e)}>
                            <option value="all" disabled selected >ALL DOGS</option>
                            <option value="api">API</option>
                            <option value="db">DB</option>
                        </select>
                    </li>
                    <li className="content-select">
                        <select  className='elementNB' onChange={e => handleSortByName(e)} >
                            <option value='selected' disabled selected>ORDER BY NAME</option>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </li>
                    <li className="content-select">
                        <select className="elementNB" onChange={e => handleSortByWeight(e)}  >
                            <option value='selected'  disabled selected>ORDER BY WEIGTH</option>
                            <option value='asc'>Lighter to heavier</option>
                            <option value='desc'>Heavier to lighter</option>
                        </select>
                    </li>
                    <li className="content-select">
                        <select className='elementNB' defaultValue='selected' name='temperaments' onChange={e => handleFilterTemperaments(e)} >
                            <option value='selected'  disabled selected>FILTER BY TEMPERAMENTS</option>
                            <option value='all'>All</option>
                            {allTemperaments.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </li>
                </ul>
                <div className="search-bar">
                    <Link to='/dogs'>
                        <button className='boton'> 
                            <strong>CREATE DOG</strong>
                        </button>
                    </Link>
                    <button className='boton' onClick={e => { handleClick(e) }} >
                        <strong>RESET</strong>
                    </button>
                </div>
                    <SearchBar 
                    setCurrentPage={setCurrentPage} />
            </div>
            <div>
            {<Paginado 
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado = {paginado}
            currentPage={currentPage}/>}
            </div>
            <div className='cardsContainer'>
                {currentDogs?.map(d => {
                    return (
                        <Card 
                        key={d.id}
                        id={d.id}
                        image={d.image ? d.image : img}
                        name={d.name}
                        temperaments={d.temperaments}
                        weightMin={d.weightMin}
                        weightMax={d.weightMax}
                        heightMin={d.heightMin}
                        heightMax={d.heightMax}
                        origin={d.origin}
                         />
                    )
                })}
                
            </div>
        </div>
        
        : <Loading/> }  </div>
         
    )
}
