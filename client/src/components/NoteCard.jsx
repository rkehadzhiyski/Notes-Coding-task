import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const NoteCard = (data) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/note/${data.data.id}`);
    };

    return (
        <Card style={{ width: '18rem', height: '14rem' }} onClick={handleClick}>
            <Card.Body>
                <Card.Title>{data.data.noteTitle}</Card.Title>
                <Card.Text>{data.data.noteContent}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;