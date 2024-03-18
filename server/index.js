const express = require('express');
const router = require('express').Router();
// const cors = require('cors');
const notesController = require('./controllers/notesController');

const app = express();

const PORT = 8888;

// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('RESTful service');
});

router.use('/notes', notesController);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));