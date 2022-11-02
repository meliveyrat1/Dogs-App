const { Router } = require('express');
const router = Router();
const { getAllDogs } = require('../controllers/dogControllers');
const { Temperament, Dog } = require('../db');



router.get('/', async(req, res, next)=>{

    const {name} = req.query;
    let dogTotal = await getAllDogs();
    
    try{
    if(name){
        let dogName = await dogTotal.filter(dog => dog.name.toLowerCase()
        .includes(name.toLowerCase()))

        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("dog not found")

    }else{
        res.status(200).send(dogTotal)
    }
    } catch(error){
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const allBreeds = await getAllDogs();
    try {
        if (id) {
        let breed = await allBreeds.filter(b => b.id == id);
        breed.length? 
        res.status(200).json(breed): 
        res.status(404).send(`Ups...we dont have a breed with ${id} as ID `);
    }
    } catch (error) {
        next(error)
    }
});

 
router.post('/', async (req,res,next) => {
    
        let {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        createdInDb,
        temperaments   
    } = req.body;
    //console.log(req.body)
    try{
    const breedCreated = await Dog.create({
        name,
        heightMin,//: parseInt(heightMin),
        heightMax,//: parseInt(heightMax),
        weightMin,//: parseInt(weightMin),
        weightMax,//: parseInt(weightMax),
        life_span,
        image,
        createdInDb,
    });
    const temperamentsDB = await Temperament.findAll({
        where: {
            name: temperaments,
        }
    });
    breedCreated.addTemperament(temperamentsDB);
    res.send('Breed created successfully')
    } catch (error) {
        next(error)
    }
});
  
module.exports = router;