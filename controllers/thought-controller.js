const { Thought } = require('../models');

const thoughtController = {
  //add thought
  createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },

  // GET /api/thoughts
  findThought({ params, body }, res) {
    Thought.find({})
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },
  // GET /api/thoughts/:id
  findOneThough({ params, body }, res) {
    Thought.findById(params.Id)
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },

  removeOneThough({ params, body }, res) {
    Thought.findByIdAndUpdate(params.Id)
      .then((dbdata) => res.json(dbdata))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
