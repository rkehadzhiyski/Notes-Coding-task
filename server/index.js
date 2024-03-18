const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const uuid = require('uuid');

const app = express();

const PORT = 8888;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('RESTful service');
});

const notes = [];

app.post('/notes/create', async (req, res) => {
    try {
        const { noteTitle, noteContent } = req.body;
        const id = uuid.v4();

        const newNote = { id, noteTitle, noteContent };

        notes.push(newNote);
        res.status(201).json(newNote);
        console.log(notes);
    } catch (error) {
        console.error('Error while creating note:', error);
        res.status(400).json({
            message: 'Cannot create Note'
        });
    }
});

app.get('/notes/all-notes', async (req, res) => {
    try {        
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));