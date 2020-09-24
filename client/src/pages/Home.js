import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Jumbotron, Row, Col, ButtonGroup, ButtonToolbar, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Home() {
    return (
        <Jumbotron className='col-8 mx-auto'>
            <Container>
                <Row>
                    <Col>
                        <h2 className='text-center'>
                            Welcome to SFU Burnaby Campus Study Space Finder!
                        </h2>
                        <p className='lead text-center'>
                            To begin, select an option below:
                        </p>
                        <ButtonToolbar className='justify-content-center'>
                            <ButtonGroup>
                                <LinkContainer to='/find-closest-room' >
                                    <Button className='px-2 mr-2 my-1' size='sm' variant='outline-primary'>
                                        Find Closest Room
                                    </Button>
                                </LinkContainer>
                            </ButtonGroup>
                            <ButtonGroup>
                                <LinkContainer to='/find-by-room'>
                                    <Button className='px-2 mr-2 my-1'size='sm' variant='outline-primary'>
                                        Find by Room
                                    </Button>
                                </LinkContainer>
                            </ButtonGroup>
                            <ButtonGroup>
                                <LinkContainer to='/find-free-rooms'>
                                    <Button className='px-2 mr-2 my-1'size='sm' variant='outline-primary'>
                                        Find Free Rooms
                                    </Button>
                                </LinkContainer>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                    <Col className='mx-auto align-self-center'>
                        <Image src='sfu-map.png' className='w-100'></Image>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}

export default Home;