import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';

function ErrorPage() {
    return (
        <Jumbotron className='col-8 mx-auto text-wrap'>
            <Container>
                <Row>
                    <Col>
                        <h2 className='text-center'>
                            Oops!  You've been naughty and now you're lost!
                        </h2>
                        <p className='lead text-center'>
                            Select one of the tabs above to go back to a safe place!
                        </p>
                    </Col>
                    <Col className='mx-auto align-self-center'>
                        <Container className='embed-responsive embed-responsive-4by3'>
                            <iframe title='gif' src="https://giphy.com/embed/wSSooF0fJM97W" width="300" height="300" frameBorder="0" class="giphy-embed mx-auto" allowFullScreen></iframe>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default ErrorPage;