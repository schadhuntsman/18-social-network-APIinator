const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./routes/thought-routes');


router.use('/thought-routes', thoughtsRoutes);
router.use('/user-routes', userRoutes);

module.exports = router;