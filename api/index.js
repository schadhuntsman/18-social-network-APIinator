const router = require('express').Router();
const apiRoutes = require('./api');
// const thoughtsRoutes = require('./routes/thought-routes');
// const userRoutes = require('./routes/user-routes');
// const 

router.use('/api', apiRoutes);
router.use('/thought-routes', thoughtsRoutes);
// router.use('/user-routes', userRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;