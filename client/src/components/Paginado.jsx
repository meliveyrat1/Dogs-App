import React from 'react';
import '../styles/Paginado.css';


export default function Paginado({dogsPerPage, currentPage, allDogs, paginado}){//le paso todos los estados locales del paginado de comp home
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) { //math.ceil me redondea para arriba, todos mis dogs sobre la cantidad de dogs que quiero por pag. (tomo el numero redondeado que resulta de dividir todos los dogs por el num de dogs por pagina que yo quiero)
        pageNumbers.push(i) //ese numereo lo pusheo a pagenumbers, un aarreglo de numeros que va a tener el resultado del alldogs/dogsperpage
    }    
    return( //este componente va a ser el que renderiza los numeros del paginado
        <nav>
         {/*  <div className='flechas-container'>
            {
              currentPage > 1 ? <button className='flechas' onClick={()=>paginado(currentPage - 1)}> ❮ </button>:
              <button className='flechas' disabled> ❮ </button>
            }
             {
              currentPage < pageNumbers.length ? <button className='flechas' onClick={()=>paginado(currentPage + 1)}> ❯ </button>:
              <button className='flechas' disabled> ❯ </button>
            }
          </div> */}
            <div className='paginado'>
        {// si tengo pagNumbers mapeamelo y devolveme por ese arreglo cada uno de los numeros que te devuelva el paginado. Num es cada una de la paginas que yo necesito para renderizar todos mis dogs
          pageNumbers?.map(num=>(
            <span key={num}>
              <button className='number' onClick={()=>paginado(num)} ><strong>{num}</strong></button>
            </span>
          ))
        }
      </div>
    </nav>
      )
    }

