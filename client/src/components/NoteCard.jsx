import Card from 'react-bootstrap/Card';

const NoteCard = (data) => {
    return (
        <Card style={{ width: '18rem', height: '14rem'}}>
            <Card.Body>
                <Card.Title>{data.data.noteTitle}</Card.Title>                
                <Card.Text>{data.data.noteContent}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;