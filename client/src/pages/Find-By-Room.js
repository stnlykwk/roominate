import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Jumbotron, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

// https://github.com/jquense/react-big-calendar
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

function FindByRoom() {
    // data from back-end
    const [times, setTimes] = useState({});
    // list of building codes
    const [buildingCodes, setBuildingCodes] = useState([]);
    // current building
    const [building, setBuilding] = useState('');
    // rooms list
    const [rooms, setRooms] = useState([]);
    // selected room
    const [roomnumber, setRoomnumber] = useState('')

    const [events, setEvents] = useState([])

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
            console.log('error populating rooms dropdown');
            console.log(err);
        });
    }, [building])

    // var state;
    function setStateEvents(rows){
        var returnEvent = [];
        rows.forEach(function (row){
            
            var day;
            if (row.days.includes("Mo")) {
                day=1
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)       
            } 
            if (row.days.includes("Tu")) {
                day=2
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)      
            }
            if (row.days.includes("We")) {
                day=3
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)      
            }
            if (row.days.includes("Th")) {
                day=4
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)    
            }
            if (row.days.includes("Fr")) {
                day=5
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)    
            }
            if (row.days.includes("Sa")) { 
                day=6
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)    
            }
            if (row.days.includes("Su")) {
                day=7
                var newEvent = {};
                newEvent['start'] = moment().weekday(day).hours(Number(row.starttime.split(":")[0])).minutes(Number(row.starttime.split(":")[1])).toDate()
                newEvent['end'] =  moment().weekday(day).hours(Number(row.endtime.split(":")[0])).minutes(Number(row.endtime.split(":")[1])).toDate()
                newEvent['title'] = row._id     
                returnEvent.push(newEvent)    
            }
        })
        setEvents(returnEvent)
    }

    // get occupied times
    function getTimes() {
        axios.get(
            `http://localhost:3001/findByRoom/?buildingcode=${building}&roomnumber=${roomnumber}`
        ).then(res => {
            setStateEvents(res.data);
            setTimes(res.data);
        }).catch(err => {
            console.log('error getting occupied times');
            console.log(err);
        });
    }

    var eventCalendar;
    if(events.length){
        eventCalendar =  ( <Container className='calendar'>
                    <div className="calendar">
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="week"
                        events={events}
                        style={{ height: "100vh" }}
                    />
                    </div>
                </Container>
        )
    }

    return (
        <Jumbotron className='col-8 mx-auto text-wrap'>
            <Container>
                <Row>
                    <Col>
                        <h2 className='text-center'>
                            Find Out When a Specific Room is Booked This Week!
                        </h2>
                        <p className='lead text-center'>
                            To begin, fill in the form below:
                        </p>
                        <Form>
                            <Form.Group controlId='building'>
                                <Form.Label>Building</Form.Label>
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
                                <Form.Label>Room</Form.Label>
                                <Form.Control name='roomnumber' as='select' onChange={e => {setRoomnumber(e.target.value)}}>
                                    {rooms.map(item => (
                                        <option key={item} value={item}>
                                        {item}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Container className='text-center'>
                                <Button variant="outline-primary" type="button" onClick={getTimes}>
                                    Submit
                                </Button>
                            </Container>
                        </Form>
                    </Col>
                    <Col className='mx-auto align-self-center'>
                        <Image src='sfu-map.png' className='w-100'></Image>
                    </Col>
                </Row>
            </Container>
            <Container className='calendar pt-4'>
                {eventCalendar}
            </Container>
        </Jumbotron>
    );
}

export default FindByRoom;