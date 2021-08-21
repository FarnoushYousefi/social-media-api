const router = require('express').Router();

const Thought =require('../../controllers/thought-controller');

router.route('/').post(Thought.createThought).get(Thought.findThought)
router.route('/:Id').get(Thought.findOneThough).delete(Thought.removeOneThough)

module.exports=router;