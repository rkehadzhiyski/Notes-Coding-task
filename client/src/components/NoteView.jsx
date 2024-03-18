import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NoteView = () => {
    const { noteId } = useParams();

    const schema = yup.object().shape({
        noteTitle: yup.string().required('Title is required'),
        noteContent: yup.string().required('Text is required'),
    });

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
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
                setValue('noteTitle', data.noteTitle);
                setValue('noteContent', data.noteContent);
            } catch (error) {
                console.error('Error fetching note:', error.message);
            }
        };

        fetchNotes();
    }, [noteId, setValue]);

    const onSubmit = async (data) => {
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

    const handleDelete = () =>{
        
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                    type="noteTitle"
                    {...register('noteTitle')}
                    placeholder="Enter a title"
                    autoComplete="name-input"
                />
                <Form.Text className="text-danger">{errors['noteTitle']?.message}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Note text</Form.Label>
                <Form.Control
                    style={{ height: '150px' }}
                    as={'textarea'}
                    type="text"
                    {...register('noteContent')}
                    placeholder="Enter note"
                    autoComplete="description"
                />
                <Form.Text className="text-danger">{errors['noteContent']?.message}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                Delete
            </Button>
        </Form>
    )
}

export default NoteView;