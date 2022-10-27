const router = require('express').Router();
const { 
    getAllThoughts,
    addThoughts,
    getThoughtsById,
    removeThoughts,
    updateThoughts,
    addReaction,
    removeReaction,
    } = require('../../controllers/thoughtController');

//api/thoughts/<userId>
router.route('/')
.get(getAllThoughts)
.post(addThoughts);


//api/thoughts/<userId>/<thoughtId>
router
.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(removeThoughts);

router.route('/:thoughtId/reaction').post(addReaction)
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;