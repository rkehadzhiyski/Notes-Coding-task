const router = require('express').Router();

const notesController = require('./controllers/notesController');

router.use('/', notesController);

module.exports = router;