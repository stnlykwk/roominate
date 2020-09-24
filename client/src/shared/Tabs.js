import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Tabs() {
    return (
        <Row>
            <Col>
                <Nav variant='tabs' className='justify-content-center'>
                    <LinkContainer exact to='/home'>
                        <Nav.Link className='text-secondary'>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/find-closest-room'>
                        <Nav.Link className='text-secondary'>Find Closest Room</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/find-by-room'>
                        <Nav.Link className='text-secondary'>Find by Room</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/find-free-rooms'>
                        <Nav.Link className='text-secondary'>Find Free Rooms</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Col>
        </Row>
    )
}

export default Tabs;