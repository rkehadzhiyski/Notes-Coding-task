import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './noteView.module.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { deleteNote, getNote, updateNote } from '../api/notes';

const NoteView = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();

    const schema = yup.object().shape({
        noteTitle: yup.string().required('Title is required'),
        noteContent: yup.string().required('Text is required'),
    });

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchNote = async () => {
            const data = await getNote(noteId);
            setValue('noteTitle', data.noteTitle);
            setValue('noteContent', data.noteContent);
        }
        fetchNote();
    }, [noteId, setValue]);

    const onSubmit = async (data) => {
        await updateNote(data, noteId);
    };

    const handleDelete = async () => {
        await deleteNote(noteId);
        navigate('/my-notes');
    }

    return (
        <div className={styles['form-container']}>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
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
                <div className={styles['buttons-container']}>
                    <Button variant="primary" type="submit">
                        Edit
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default NoteView;