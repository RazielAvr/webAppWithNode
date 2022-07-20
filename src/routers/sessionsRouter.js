const express = require('express');
const sessionsRouter = express.Router();
const sessions = require('../data/sessions.json');


sessionsRouter.route('/').get((req, res) => {
    res.render('sessions', {
        sessions,
    });
});
sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    res.render('session', {
        session: sessions[id],
    });
});

module.exports = sessionsRouter;