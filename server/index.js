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

function updateNoteById(id, updatedNoteData) {
    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes[index] = { ...notes[index], ...updatedNoteData };
        return notes[index];
    }

    return null;
}

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

app.get('/note/:noteId', async (req, res) => {
    const noteId = req.params.noteId;

    try {
        const note = notes.find(note => note.id === noteId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'An error occurred while fetching the note' });
    }
});

app.post('/note/:noteId', async (req, res) => {
    const noteId = req.params.noteId; 
    const updatedNoteData = req.body; 

    try {
        const updatedNote = await updateNoteById(noteId, updatedNoteData);

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'An error occurred while updating the note' });
    }
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));