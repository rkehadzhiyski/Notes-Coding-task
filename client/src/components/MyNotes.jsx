import { useEffect, useState } from "react";
import NodeCard from './NoteCard';

const MyNotes = () => {
    const [notes,setNotes] = useState([]);

    useEffect(() => {       
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:8888/notes/all-notes');
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error('Error fetching notes:', error.message);
            }
        };

        fetchNotes();
    }, []);

    return (
        <>
            <h1>My notes</h1>
            {notes && 
                notes.map(note => (
                    <NodeCard key={note.id} data={note} onClick/>
                ))
            }           
        </>
    )
}

export default MyNotes;