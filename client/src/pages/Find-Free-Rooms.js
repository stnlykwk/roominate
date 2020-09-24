import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Jumbotron, Row, Col, Image, Table } from 'react-bootstrap';
import axios from 'axios';

function FindFreeRooms() {
    // results from back-end
    const [freeRooms, setFreeRooms] = useState([]);
    // selected day
    const [day, setDay] = useState('Mo')
    // start time
    const [startTime, setStartTime] = useState('08:30');
    // end time
    const [endTime, setEndTime] = useState('09:00');

    // get free rooms
    function getFreeRooms() {
        if (startTime >= endTime) {
            alert("End time must be later than start time.");
        } else {
            axios.get(
                `http://localhost:3001/findFreeRooms/?weekday=${day}&start=${startTime}&end=${endTime}`
            ).then(res => {
                setFreeRooms(res.data);
            }).catch(err => {
                console.log('error getting free rooms');
                console.log(err);
            });
        }
    }

    // list free rooms
    var freeRoomsList;
    var table;
    if(freeRooms.length) {
        freeRoomsList = freeRooms.map(item => {
            return (
                <tr>
                    <td>{item.buildingCode}</td>
                    <td>{item.roomNumber}</td>
                </tr>
            )
        })
        table = (
            <Table className='w-50 mx-auto' striped bordered hover>
                <thead>
                    <tr>
                        <th>Building</th>
                        <th>Room</th>
                    </tr>
                </thead>
                <tbody>
                    {freeRoomsList}
                </tbody>
            </Table>
        )
    }

    return (
        <Jumbotron className='col-8 mx-auto text-wrap'>
            <Container>
                <Row>
                    <Col>
                        <h2 className='text-center'>
                            Find Out Which Rooms Are Free!
                        </h2>
                        <p className='lead text-center'>
                            To begin, fill in the form below:
                        </p>
                        <Form>
                            <Form.Group controlId='day'>
                                <Form.Label>Weekday</Form.Label>
                                <Form.Control name='day' size='sm' as="select" onChange={e => setDay(e.target.value)}>
                                    <option value="Mo">Monday</option>
                                    <option value="Tu">Tuesday</option>
                                    <option value="We">Wednesday</option>
                                    <option value="Th">Thursday</option>
                                    <option value="Fr">Friday</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='start'>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control name='start' size='sm' as='select' onChange={e => {setStartTime(e.target.value)}}>
                                    <option value="08:30">08:30</option>      
                                    <option value="09:00">09:00</option>      
                                    <option value="09:30">09:30</option>      
                                    <option value="10:00">10:00</option>      
                                    <option value="10:30">10:30</option>      
                                    <option value="11:00">11:00</option>      
                                    <option value="11:30">11:30</option>      
                                    <option value="12:00">12:00</option>      
                                    <option value="12:30">12:30</option>      
                                    <option value="13:00">13:00</option>      
                                    <option value="13:30">13:30</option>      
                                    <option value="14:00">14:00</option>      
                                    <option value="14:30">14:30</option>      
                                    <option value="15:00">15:00</option>      
                                    <option value="15:30">15:30</option>      
                                    <option value="16:00">16:00</option>      
                                    <option value="16:30">16:30</option>      
                                    <option value="17:00">17:00</option>      
                                    <option value="17:30">17:30</option>      
                                    <option value="18:00">18:00</option>      
                                    <option value="18:30">18:30</option>      
                                    <option value="19:00">19:00</option>      
                                    <option value="19:30">19:30</option>      
                                    <option value="20:00">20:00</option>       
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='end'>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control name='end' size='sm' as='select' onChange={e => {setEndTime(e.target.value)}}>
                                    <option value="09:00">09:00</option>      
                                    <option value="09:30">09:30</option>      
                                    <option value="10:00">10:00</option>      
                                    <option value="10:30">10:30</option>      
                                    <option value="11:00">11:00</option>      
                                    <option value="11:30">11:30</option>      
                                    <option value="12:00">12:00</option>      
                                    <option value="12:30">12:30</option>      
                                    <option value="13:00">13:00</option>      
                                    <option value="13:30">13:30</option>      
                                    <option value="14:00">14:00</option>      
                                    <option value="14:30">14:30</option>      
                                    <option value="15:00">15:00</option>      
                                    <option value="15:30">15:30</option>      
                                    <option value="16:00">16:00</option>      
                                    <option value="16:30">16:30</option>      
                                    <option value="17:00">17:00</option>      
                                    <option value="17:30">17:30</option>      
                                    <option value="18:00">18:00</option>      
                                    <option value="18:30">18:30</option>      
                                    <option value="19:00">19:00</option>      
                                    <option value="19:30">19:30</option>      
                                    <option value="20:00">20:00</option>      
                                    <option value="20:30">20:30</option> 
                                </Form.Control>
                            </Form.Group>
                            <Container className='text-center'>
                                <Button variant="outline-primary" type="button" onClick={getFreeRooms}>
                                    Submit
                                </Button>
                            </Container>
                        </Form>
                    </Col>
                    <Col className='mx-auto align-self-center'>
                        <Image src='sfu-map.png' className='w-100'></Image>
                    </Col>
                </Row>
                <Row className='pt-4'>
                    <Col>
                        {table}
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default FindFreeRooms;