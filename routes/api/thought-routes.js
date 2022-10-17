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
.get(getThoughtId)
.put(updateThought)
.delete(removeThought);

//api/thoughts/<userId>/<thoughtId>
router
.route('/:id')
.put(addReaction)
.delete(removeThought)

router.route('/:thoughtId/reaction').delete(removeReaction);
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;