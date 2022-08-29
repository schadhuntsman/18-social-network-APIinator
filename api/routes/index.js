const router = require('express').Router();
const userRoutes = require('./user-routes');

//add prefix of to routes created in pizzaroutes
router.use('./user-routes', userRoutes);

module.exports = router;