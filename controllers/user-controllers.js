const { User, Thought, Reaction } = require('../models');

// POST /api/users
const userController = {
  createUser({ params, body }, res) {
    console.log(body);
    User.create(body)
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },
  // GET /api/users
  findUsers({ params, body }, res) {
    User.find({})
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },
  // GET /api/users/:id
  findOne({ params, body }, res) {
    User.findById(params.Id)
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },
  // DELETE /api/users/:id
//   removeUser({ params, body }, res) {
//     User.findByIdAndDelete(params.Id)
//       .then((deletedUser) => {
//         console.log(deletedUser);

//         deletedUser.thoughts.map((thoughtId) =>
//           Thought.findByIdAndDelete(thoughtId)
//         ).then((dbuserdata) => res.json(dbuserdata))
//       })
      

//       .catch((err) => res.json(err));
//   },
updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.Id, body, { new: true, runValidators: true })
    .then(dbUserData => {
        console.log('update',dbUserData )
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

removeUser ({ params, body }, res) {
    User.findByIdAndDelete(params.Id)
      .then((deletedUser) =>{
        return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      })
      .then((dbuserdata) => res.json(dbuserdata))
      .catch((err) => res.json(err));
  },
  
  // POST /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    console.log(params);
    // add friendId to userId's friend list
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this userId' });
          return;
        }
        // add userId to friendId's friend lis
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // delete /api/users/:userId/friends/:friendId
  removeFriend({ params }, res) {
    console.log(params);
    // remove friendId from userID friend list
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this userId' });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
