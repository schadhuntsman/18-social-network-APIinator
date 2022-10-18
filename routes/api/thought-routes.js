const router = require('express').Router();
const { 
    getAllThoughts,
    addThought,
    getThoughtId,
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
.get(getThoughtId)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId/reaction').post(addReaction).delete(removeReaction);
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;