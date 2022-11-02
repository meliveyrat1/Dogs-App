const axios = require("axios");
const apiKey= "live_oWUrA7VxCgm5o2hZRNqeE6utGpfqzi4GH4MNelwoLvgthZBZBt0Hd8Y3eX3QFi7M";
const {Dog, Temperament} = require('../db');
require('dotenv').config();


    const getDogsApi = async ()=>{
    
        let dogsApi = (await axios (`https://api.thedogapi.com/v1/breeds/?api_key=${apiKey}`)).data
        .map(d => {
            return{
            id:d.id,
            name: d.name,
            weightMin:Number.isNaN(parseInt(d.weight.metric.split(' - ')[0]))  ? 20 :parseInt(d.weight.metric.split(' - ')[0]),
            weightMax:Number.isNaN(parseInt(d.weight.metric.split(' - ')[1]))  ? 50 : parseInt(d.weight.metric.split(' - ')[1]),
            heightMin:Number.isNaN(parseInt(d.height.metric.split(' - ')[0])) ? 1 :parseInt(d.height.metric.split(' - ')[0]),
            heightMax:Number.isNaN(parseInt(d.height.metric.split(' - ')[1])) ? 10 : parseInt(d.height.metric.split(' - ')[1]), 
            life_span: d.life_span,
            origin: d.origin,
            image:d.image.url,
            temperaments: typeof(d.temperament) === 'string'? d.temperament.split(', '):d.temperament ,
           
            }

        })
        return dogsApi;

}
    const getDogsDb = async () =>{
    return await Dog.findAll({
    includes: {
    model: Temperament,
    attributes: ["name"],
    through: {
        attributes: [],
    }
    }

})
}
   const getAllDogs = async () =>{
   let apiInfo = await getDogsApi();
   let dbInfo = await getDogsDb();
   let infoTotal = apiInfo.concat(dbInfo);
   return infoTotal;

}



module.exports = {
    getDogsApi,
    getDogsDb,
    getAllDogs
};