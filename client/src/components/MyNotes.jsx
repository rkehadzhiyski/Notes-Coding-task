import { useEffect, useState } from "react";
import NodeCard from './NoteCard';

import styles from './myNotes.module.css';

import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getNotes } from "../api/notes";

const MyNotes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const data = await getNotes();
            setNotes(data);
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