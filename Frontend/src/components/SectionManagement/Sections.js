import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Header from "../Header";

import { Card, CardBody, CardFooter, CardTitle } from "reactstrap";
import { Button } from 'reactstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserNavBar from "../common/user-header";

const baseURL = process.env.REACT_APP_EC2_SERVER_URL;

const Sections = () => {

    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const [sections, setSections] = React.useState([]);

    const showBooks = (params, sectionId) => {
        navigate('/books/' + sectionId);
    }

    async function getPost() {
        const response = await axios.get(baseURL + 'section/get_sections');
        console.log("response data", response.data)
        setSections(response.data);
        console.log("current state=", sections);
    }

    React.useEffect(() => {
        getPost();
    }, []);


    return (
        <div>
            <UserNavBar></UserNavBar>
            <h2>Sections</h2>
            <br /><br />
            <Row>
                {sections.map((section) =>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <CardTitle><b>{section.sectionName}</b></CardTitle>
                                {/*<img src={user.picture} className="card-img-top"/>*/}
                                <figcaption className="info-wrap">
                                    <img width={250} height={300} src={section.imageUrl}></img>
                                    <p className="title"><b>Section Name:</b> {section.sectionName}</p>
                                    <p className="price mt-1"><b>Location:</b> {section.location}</p>
                                    <p lassName="price mt-1"><b>Number Of Books:</b> {section.bookCount} </p>
                                </figcaption>
                            </CardBody>
                            <CardFooter className="text-muted">
                                <Link to={`/books/${section.id}`}>
                                    <Button size="sm" color="primary" onClick={event => showBooks(event, section.id)}>Show Books</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Sections;