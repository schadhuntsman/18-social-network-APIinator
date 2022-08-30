// const router = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thoughtsController');

//api/thoughts/<userId>
router.route('/:userId').post(addThought);

//api/thoughts/<userId>/<thoughtId>
router.route('/:userId/thoughtId').delete(removeThought);



module.exports = router;