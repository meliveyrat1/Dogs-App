import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../redux/actions'; //importo la accion getdogs de actions
import '../styles/SearchBar.css';

function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("");//vamos a hacer un estado local,

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)//este es el value del imput, aqui esta funcion el value del imput va a tomar el value del usestate
        //esta funcion se la paso al input
    }
     function handleSubmit(e){//ls funcion para manejar el boton del submit,
        e.preventDefault();
        dispatch(getDogs(name)); //este name va a ser mi estado local,yo voy a ir guardando lo que escriba el usuario en mi estado local name
        setCurrentPage(1);
     }
    return (
        <div className='group'> 
            <input
                className='input'
                type='search'
                placeholder='   Search Dog ...'
                onChange={(e) => handleInputChange(e) }
                value={name}
            />
            <button className='searching' type='search' onClick={(e) => handleSubmit(e)}><strong className='nameS'>SEARCH</strong></button>
        </div>
    )
}

export default SearchBar