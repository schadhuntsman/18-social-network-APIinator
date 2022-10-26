const router = require('express').Router();
const { 
    getAllThoughts,
    addThought,
    getThoughtById,
    removeThought,
    updateThought,
    addReaction,
    removeReaction,
    } = require('../../controllers/thoughtsController');

//api/thoughts/<userId>
router.route('/')
.get(getAllThoughts)
.post(addThought);


//api/thoughts/<userId>/<thoughtId>
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId/reaction').post(addReaction)
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;