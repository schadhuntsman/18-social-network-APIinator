// const router = require('express').Router();
const userRoutes = require('./user-routes');
const apiRoutes = require('./api');
const thoughtsRoutes = require('./routes/thought-routes');
// const userRoutes = require('./routes/user-routes');


//add prefix of to routes created in pizzaroutes
router.use('/api', apiRoutes);
router.use('/thought-routes', thoughtsRoutes);
router.use('/user-routes', userRoutes);router.use('./user-routes', userRoutes);

module.exports = router;