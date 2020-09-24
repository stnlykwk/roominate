import React from 'react';
import { Nav } from 'react-bootstrap';

function Topbar() {
    return (
        <Nav className='bg-light justify-content-around'>
            <Nav.Item as='a' href="https://www.sfu.ca" className='navbar-brand w-25'>
            <img
                src="/sfu-logo.png"
                width='100%'
                className="d-inline-block align-top"
                alt="sfu logo"
            />
            </Nav.Item>
            <Nav className='justify-content-around'>
                <Nav.Item as='button' className='btn btn-dark btn-sm py-0 mt-5 mr-5 btn-sm' disabled>
                    Semester: Fall 2019
                </Nav.Item>
            </Nav>
        </Nav>
    );
}

export default Topbar;