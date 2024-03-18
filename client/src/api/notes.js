export const createNote = async (data) => {
    try {
        const response = await fetch('http://localhost:8888/notes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to submit the note');
        }

    } catch (error) {
        console.error('Error submitting the note:', error.message);
    }
};

export const deleteNote = async (noteId) => {
    try {
        const response = await fetch(`http://localhost:8888/note/${noteId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete the note');
        }

        console.log('Note deleted successfully');
        
    } catch (error) {
        console.error('Error deleting the note:', error.message);
    }
};

export const getNote = async (noteId) => {
    try {
        const response = await fetch(`http://localhost:8888/note/${noteId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch note');
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching note:', error.message);
    }
};

export const getNotes = async () => {
    try {
        const response = await fetch('http://localhost:8888/notes/all-notes');
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notes:', error.message);
    }
};

export const updateNote = async (data, noteId) => {
    try {
        const response = await fetch(`http://localhost:8888/note/${noteId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to edit the note');
        }

        console.log('Note edited successfully');
    } catch (error) {
        console.error('Error editing the note:', error.message);
    }
};
