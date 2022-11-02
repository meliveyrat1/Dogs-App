import {  FILTER_CREATED,
    FILTER_BY_TEMPERAMENT, 
    GET_DETAIL, 
    GET_DOGS, 
    GET_DOGS_BY_NAME, 
    GET_TEMPERAMENTS, 
    POST_DOGS, 
    SORT_BY_NAME, 
    SORT_BY_WEIGHT,
    CLEAR_DETAIL  } from "../actions";

const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],//creo un nuevo estado
    temperaments: []
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload, // en mi estado dogs(en un principio está vacío) mandá todo lo que te mande mi accion dogs
                allDogs: action.payload //hago una copia del estado que siempre tenga todos los dogs,mete todos los dog en all dogs, entonces tengo dos estados todnde los dos tienen todos los dogs. entpnces cuando haga el filter va a cambiar el estado dogs y alldogs sigue igual,no se modifica
            }
        case GET_DOGS_BY_NAME:
            if(typeof action.payload !== 'object') alert(action.payload)
            let dogFounded = typeof action.payload === 'object'? action.payload : state.allDogs
            return  {
                ...state,
                dogs: dogFounded, //va en array dogs porque es el que va a renderizar,siempre voy a trabajar con el array que va a renderizar para hecer este tipo de filtrados
            }
        case GET_TEMPERAMENTS: //hago un array nuevo para el estado temperam
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
        const allDogs = [...state.allDogs];//una const de todos los dogs,me los traigo del estado alldogs,siempre va a ser el arreglo que tenga todos los dogs
        console.log(allDogs.map(d=>d.temperaments))
        const temperamentsFilter = action.payload === 'all' ? allDogs : //en action me llega por payload los value que estan en home en el filter by temperam,osea el valor del select va a ser  el e.target.value y va a llegar a la accion por payload,
        //entonces pregunto el action.payload es all? devuelvo alldogs,no hagas nada devolveme eso y si no devolveme todos los dogs filtrados
        allDogs.filter(d => d.temperaments?.find(t => t.name === action.payload || t === action.payload))//a cada uno de esos dogs.temperam le hago un filter si hay temepram.busca cada temperam.name igual al payload que me llega
        
        return {
            ...state, 
            dogs: temperamentsFilter //quiero que en mi estado dogs, me guarde toda la logica que hice arriba en el temperamfilter. en dogs le devuelvo esa constante de arriba y cuando vuelva a hacer otro filtro va a volver a agarrar el estado que tiene todos los dogs alldogs, pero el que va a modificar va a ser el estado dogs
        }
        case FILTER_CREATED:
       /*       const dogFilter = state.allDogs
             console.log(dogFilter,action.payload) //este payload va a tener datos creados por mi de db y los de api
             let dogFound = []
             if(action.payload === "api"){
                const dogApi = dogFilter.filter(dog => dog.createdInDb === false )
                 dogFound = dogApi; 
            } else {
                const dogDb = dogFilter.filter(dog => dog.createdInDb === true )
                dogFound = dogDb;
            }
            return{
                ...state,
                dogs: dogFound
            }  */

             const dogFilter= action.payload === "db" ? state.allDogs.filter(dog => dog.createdInDb) : state.allDogs.filter(dog => !dog.createdInDb)
            return {
                ...state,
                dogs: action.payload === "all" ? state.allDogs : dogFilter
            } 
           
        case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ? //le pregunto si el action payload es asc o desc(de la forma que esta el payload, en este caso pregunto por asc),pongo lo mismo que dice el value en el comp home, son los valores que voy a tener por e.target.value y que me van a llegar al peyload como action
                state.dogs.sort(function (a, b) { // si es asc accede a mi estado dogs que es el que se está renderizando y hacele un sort, compara dos valores, si estan iguales devuelve cero, lo deja como está,te lo devuelve igual
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { //va comparando y ordena a la derecha o a la izq
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) { //si no es asc hago la misma logica, ordena de forma desc
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                console.log(sortedName)
            return {
                ...state,
                    dogs: sortedName //y aqui devuelvo el estado dogs de forma ordenada
            }
            case SORT_BY_WEIGHT:
                    const dogWeight = state.dogs
                    const sortedWeight = action.payload === 'asc'?
                   
                    dogWeight.sort(function(a,b) {
                        return a.weightMin - b.weightMin;
                    }):
                    dogWeight.sort(function(a,b) {
                        return b.weightMin - a.weightMin;
                    })
            return {
                ...state,
                    dogs: sortedWeight,
            }
            case POST_DOGS:
                return {
                    ...state, //aca me devuelve el estado como está, xq yo voy a crearlo en una ruta nueva
                }

            case GET_DETAIL: //creo un nuevo estado
                return {
                    ...state,
                        detail: action.payload,
                }
            case CLEAR_DETAIL:
                return {
                    ...state,
                        detail: []
                }
        default:
            return state;
    }
}

export default rootReducer;