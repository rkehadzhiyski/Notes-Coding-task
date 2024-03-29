import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand as={Link} to="/">Note Task</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/my-notes">My Notes</Nav.Link>                    
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;