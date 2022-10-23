import React, { useState } from "react";
import Header from "./../Header";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'
import Col from "react-bootstrap/Col";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";
import Row from "react-bootstrap/Row";
import UserNavBar from "../common/user-header";

const baseURL = process.env.REACT_APP_EC2_SERVER_URL;

const Books = () => {

    const userId = localStorage.getItem("userId");

    const { id } = useParams();

    const [books, setBooks] = useState([])

    const navigate = useNavigate();

    async function getPost() {
        const response = await axios.get(baseURL + `section/get_books/` + id);
        console.log("response data for books", response.data)
        setBooks(response.data);
        console.log("current books=", books);
    }

    const borrowBook = (event, bookId) => {
        axios.put(baseURL + `books/loan_book`, null, { params: { bookId: bookId, userId: 1 } })
            .then(data => {
                navigate('/loaned_books/1');
            })
    }

    React.useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <UserNavBar></UserNavBar>
            <br></br>
            <h2>Available Books</h2>
            <Row>
                {books.map((book) =>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <CardTitle><b>{book.name}</b></CardTitle>
                                <figcaption className="info-wrap">
                                    <img width={250} height={300} src={book.imageUrl} />
                                    <p className="title"><b>Book Name:</b> {book.name}</p>
                                    <p className="price mt-1"><b>Author:</b> {book.author}</p>
                                    <p className="price mt-1"><b>Genre:</b> {book.genre}</p>
                                    <p className="price mt-1"><b>Availability:</b> {book.isBookBorrowable ? 'Available' : 'Already Loaned out'}</p>
                                </figcaption>
                            </CardBody>
                            <CardFooter className="text-muted">
                                <Button
                                    size="sm"
                                    color="primary"
                                    disabled={!book.isBookBorrowable}
                                    onClick={event => borrowBook(event, book.id)}>
                                    Borrow Book
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default Books;