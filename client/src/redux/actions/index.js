import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_CREATED = 'FILTER_CREATED';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const GET_DETAIL = 'GET_DETAILS';
export const POST_DOGS = 'POST_DOGS';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export function getDogs(name) {//para hacer el searchbar me traigo la ruta que cumple con el query name
    return async function (dispatch) {
        try {
            if (name) {
                const dogsName = await axios.get('http://localhost:3001/dogs?name=' + name) //la url mas name ,es lo que me llega por payload cuando el usuario está escribiendi el nombre del perro en la barra de busqueda
                return dispatch ({ 
                    type: GET_DOGS_BY_NAME, 
                    payload: dogsName.data }) //me va a devolver lo que me devuelve la ruta una vez que yo le asigne algo por name
            }
            const dogs = await axios.get('http://localhost:3001/dogs');
            return dispatch({
                type: GET_DOGS,
                payload: dogs.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: error.response.data
            })
            };
        }
    }
    
export function getTemperaments(){
    return async function (dispatch){
        try {
            const temperaments = await axios.get('http://localhost:3001/temperaments');
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function sortByName(payload){
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function sortByWeight(payload) {
    return {
        type: SORT_BY_WEIGHT,
        payload
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function postDog(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/dogs', payload);//con esta accion creo el dog, le paso payload xq me va a traer toda la info de esa ruta osea todos los dogs
        console.log(response);  //con esa ruta hago el post del payload, y ese peyl es loq ue me va a llegar al front
        return dispatch ({
            type: POST_DOGS,
            payload: response
        })
        }catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id) {//tengo que traerme la ruta del id del back
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function clearDetail(){
    return {
        type:CLEAR_DETAIL
    }
}




