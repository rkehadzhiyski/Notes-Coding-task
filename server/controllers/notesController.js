const router = require('express').Router();
const uuid = require('uuid');


let notes = [];

function updateNoteById(id, updatedNoteData) {
    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes[index] = { ...notes[index], ...updatedNoteData };
        return notes[index];
    }

    return null;
}

function deleteNoteById(id) {
    const initialLength = notes.length;
    notes = notes.filter(note => note.id !== id);

    if (notes.length !== initialLength) {
        return { id }; 
    }

    return null;
}

router.post('/notes/create', async (req, res) => {
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

router.get('/notes/all-notes', async (req, res) => {
    try {        
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
});

router.get('/note/:noteId', async (req, res) => {
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

router.post('/note/:noteId', async (req, res) => {
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

router.delete('/note/:noteId', (req, res) => {
    const noteId = req.params.noteId; 

    try {
        const deletedNote = deleteNoteById(noteId);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
});

module.exports = router;