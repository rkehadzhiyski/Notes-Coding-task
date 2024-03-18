import { useEffect, useState } from "react";
import NodeCard from './NoteCard';

import styles from './myNotes.module.css';

import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

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
        <div className={styles['all-notes-container']}>
            <h1>My notes</h1>
            <section className={styles['note-cards']}>
                {notes && notes.length > 0 ? (
                    notes.map(note => (
                        <NodeCard key={note.id} data={note} onClick />
                    ))
                ) : (
                    <div className={styles['empty-state']}>
                        <p>There are no notes to show!</p>
                        <Button onClick={() => navigate('/')}>Create note</Button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default MyNotes;