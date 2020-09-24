import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Jumbotron, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

function FindClosestRoom() {
    // buildingcode, roomnumber, longitude, latitude
    const [closestRooms, setClosestRooms] = useState([]);

    // send buildingcode, roomnumber, weekday, start, end

    // list of building codes
    const [buildingCodes, setBuildingCodes] = useState([]);
    // current building
    const [building, setBuilding] = useState('');
    // rooms list
    const [rooms, setRooms] = useState([]);
    // selected room
    const [roomnumber, setRoomnumber] = useState('')
    // selecte day
    const [day, setDay] = useState('Mo')
    // start time
    const [startTime, setStartTime] = useState('08:30');
    // end time
    const [endTime, setEndTime] = useState('09:00');

    // get building codes on page load
    useEffect(() => {
        axios.get('http://localhost:3001/getBuildingCodes')
            .then(res => {
                setBuildingCodes(res.data);
            }).catch(err => {
                console.log('error getting building codes');
                console.log(err);
            });
    }, [buildingCodes.length])

    // populate rooms dropdown
    useEffect(() => {
        axios.get(`http://localhost:3001/getRooms?buildingcode=${building}`)
            .then(res => {
                setRooms(res.data);
                setRoomnumber(res.data[0]);
        }).catch(err => {
            console.log('error getting rooms');
            console.log(err);
        });
    }, [building])

    function getClosestRooms() {
        if (startTime >= endTime) {
            alert("End time must be later than start time.");
        } else {
            axios.get(
                `http://localhost:3001/findClosestRoom?buildingcode=${building}&roomnumber=${roomnumber}&weekday=${day}&start=${startTime}&end=${endTime}`
            ).then(res => {
                setClosestRooms(res.data);
            }).catch(err => {
                console.log('error getting closest rooms');
                console.log(err);
            });
        }
    }

    // list closest rooms
    var closestRoomsList;
    if (closestRooms.length) {
        closestRoomsList = closestRooms.map(item => {
            return (
            <>
            <Row className='pt-4'>
                <Col>
                    <h5>{item.buildingCode} {item.roomNumber} - <a target="_blank" rel="noopener noreferrer" href={`https://roomfinder.sfu.ca/apps/sfuroomfinder_web/?q=${item.buildingCode}%20${item.roomNumber}`}>Map</a></h5>
                </Col>
            </Row>
            <Row>
                <Col className='col-8'>
                    <Container className='embed-responsive embed-responsive-4by3'>
                        <iframe title={item.buildingCode + item.roomNumber + 'map'} width='60%' class='embed-responsive-item' src={`https://roomfinder.sfu.ca/apps/sfuroomfinder_web/?q=${item.buildingCode}%20${item.roomNumber}`}></iframe>
                    </Container>
                </Col>
            </Row>
            </>
            )
        })
    }

    return (
        <Jumbotron className='col-8 mx-auto'>
            <Container>
                <Row>
                    <Col>
                        <h2 className='text-center'>
                            Find the Closest Free Room To You!
                        </h2>
                        <p className='lead text-center'>
                            To begin, fill in the form below:
                        </p>
                        <Form>
                            <Form.Group controlId='building'>
                                <Form.Label>Nearest Building</Form.Label>
                                <Form.Control name='building' size='sm' as='select' onChange={e => {setBuilding(e.target.value)}}>
                                    <option value=''>Choose building...</option>
                                    {buildingCodes.map(item => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='room'>
                                <Form.Label>Nearest Room</Form.Label>
                                <Form.Control size='sm' name='roomnumber' as='select' onChange={e => {setRoomnumber(e.target.value)}}>
                                    {rooms.map(item => (
                                        <option key={item} value={item}>
                                        {item}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='day'>
                                <Form.Label>Weekday</Form.Label>
                                <Form.Control size='sm' as="select" onChange={e => setDay(e.target.value)}>
                                    <option value="Mo">Monday</option>
                                    <option value="Tu">Tuesday</option>
                                    <option value="We">Wednesday</option>
                                    <option value="Th">Thursday</option>
                                    <option value="Fr">Friday</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='start-time'>
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control size='sm' as="select" onChange={e => {setStartTime(e.target.value)}}>
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
                            <Form.Group controlId='end-time'>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control size='sm' as="select" onChange={e => {setEndTime(e.target.value)}}>    
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
                                <Button variant="outline-primary" type="button" onClick={getClosestRooms}>
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
                        {closestRoomsList}
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default FindClosestRoom;