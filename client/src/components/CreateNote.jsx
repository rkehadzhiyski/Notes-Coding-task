import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreateNote = () => {
    const schema = yup.object().shape({
        noteTitle: yup.string().required('Title is required'),
        noteContent: yup.string().required('Text is required'),
    });

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
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

            console.log('Note submitted successfully');
            reset()
        } catch (error) {
            console.error('Error submitting the note:', error.message);
        }
    };

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
                Create
            </Button>
        </Form>
    );
};

export default CreateNote;