const { Router } = require('express');
const router = Router();
const axios = require("axios");
const apiKey= "live_oWUrA7VxCgm5o2hZRNqeE6utGpfqzi4GH4MNelwoLvgthZBZBt0Hd8Y3eX3QFi7M";
const { Temperament} = require('../db')


    router.get('/', async (req, res, next)=>{
        try{
        
        let dogsApi = (await axios (`https://api.thedogapi.com/v1/breeds/?api_key=${apiKey}`)).data.map(el => el.temperament).toString(); //me trae un string con todos los temp separados por comas
        dogsApi = await dogsApi.split(',');
        const tempsConEspacio = await dogsApi.map(el => {
            if (el[0] == ' ') {
                return el.split('');
            }
            return el;
        });
        const tempsSinEspacio = await tempsConEspacio.map(el => {
            if (Array.isArray(el)) {
                el.shift();
                return el.join('');
            }
            return el;
        })
    
        await tempsSinEspacio.forEach(el => {
            if (el != '') {
                Temperament.findOrCreate({
                    where: {
                        name: el
                    },
                });
            }
        });
        const allTemps = await Temperament.findAll();
        res.status(200).send(allTemps); 

    }catch(error){
        next(error);
    }
    });
    
    module.exports = router;
      

   