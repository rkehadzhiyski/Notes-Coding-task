import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NoteView = () => {
    const [note, setNote] = useState({});
    const { noteId } = useParams();

    const schema = yup.object().shape({        
        noteContent: yup.string().required('Text is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:8888/note/${noteId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch note');
                }
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Error fetching note:', error.message);
            }
        };

        fetchNotes();
    }, [noteId]);

    const onSubmit = async () => {
        // try {
        //     const response = await fetch('http://localhost:8888/notes/create', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to submit the note');
        //     }

        //     console.log('Note submitted successfully');
        //     reset()
        // } catch (error) {
        //     console.error('Error submitting the note:', error.message);
        // }
    };

    return (
        <Card style={{ width: '20rem', height: '25rem' }} >
            <Card.Body>
                <Card.Title>{note.noteTitle}</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Note text</Form.Label>
                        <Form.Control
                            style={{ height: '150px' }}
                            as={'textarea'}
                            type="text"
                            {...register('noteContent')}
                            placeholder={`${note.noteContent}`}
                            autoComplete="description"
                        />
                        <Form.Text className="text-danger">{errors['noteContent']?.message}</Form.Text>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Button variant="primary" type="submit">
                Edit
            </Button>
            <Button variant="danger" type="submit">
                Delete
            </Button>
        </Card>
    )
}

export default NoteView;