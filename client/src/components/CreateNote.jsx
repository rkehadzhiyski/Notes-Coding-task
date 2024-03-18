import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CreateNote = () => {
    const schema = yup.object().shape({
        noteTitle: yup.string().required('Title is required'),
        noteContent: yup.string().required('Note is required'),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async(data) => {
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
        } catch (error) {
            console.error('Error submitting the note:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Title:</label>
                <Controller
                    name="noteTitle"
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="text" />
                    )}
                />
                {errors.noteTitle && <span>{errors.noteTitle.message}</span>}
            </div>
            <div>
                <label>Note:</label>
                <Controller
                    name="noteContent"
                    control={control}
                    render={({ field }) => (
                        <textarea {...field} rows="4" />
                    )}
                />
                {errors.noteContent && <span>{errors.noteContent.message}</span>}
            </div>
            <div>
                <input type="submit" value="Add Note" />
            </div>
        </form>
    );
};

export default CreateNote;