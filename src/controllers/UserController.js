const State = require('../models/State');

module.exports = {
    getStates: async (req, res) => {
        const states = await State.find().exec();
        res.json({ states });
    },

    info: async (req, res) => {

    },

    editAction: async (req, res) => {

    }
};