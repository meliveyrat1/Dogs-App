const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const tempRouter = require('./temperamentsRouter');
const dogsRouter = require('./dogsRouter');
const router = Router();


 router.use('/dogs', dogsRouter);
 router.use('/temperaments', tempRouter );


module.exports = router;
