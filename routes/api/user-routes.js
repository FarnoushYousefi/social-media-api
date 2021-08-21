const router = require('express').Router();

const user =require('../../controllers/user-controllers')
router.route('/').post(user.createUser).get(user.findUsers);
router.route('/:Id').get(user.findOne).delete(user.removeUser);

router.route('/users/:userId/friends/:friendId').post(user.addFriend)



module.exports=router;