import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from "./../Header";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import AdminNavBar from "../../components/common/admin-header";
import AddModal from "./AddModal";
import axios from "axios";

const baseURL = process.env.REACT_APP_EC2_SERVER_URL;

const Admin = () => {
    // const url = "lmsbackendv2-env.eba-ybvchve3.us-east-1.elasticbeanstalk.com/";
    const userId = localStorage.getItem("userId");
    console.log("user Id is" + userId);
    const [books, setbooks] = useState([]);
    const [sections, setSections] = useState([]);
    const [book, setBook] = useState([]);

    const handleChange = (event, row) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log(row)
        let sectionId = event.target.value;
        let bookId = row.p.id
        fetch(baseURL + "books/assign_book?sectionId=" + sectionId + "&bookId=" + bookId, {
            method: "PUT",
            headers: header,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("assign books data==>", data);
                // if (data) {
                //     setbooks(data);
                // }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const saveSection = (e, book) => {
        e.preventDefault();
        console.log("save")
        // console.log(book.p);
        console.log("book id is==>" + book.p.id);
        console.log("section id is==>")
    }

    const imageUpload = (e, bookId) => {
        if (e.target.files) {

            var bodyFormData = new FormData();
            bodyFormData.set('file', e.target.files[0]);


            console.log(bodyFormData);
            axios({
                method: "post",
                url: baseURL+'books/upload_image/'+bookId,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((data=>{
                    console.log(data);
            }))

        }
    }

    const header = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
    });
    useEffect(() => {
        // console.log(baseURL);
        fetch(baseURL + "books/get_all", {
            method: "GET",
            headers: header,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("books are==>", data);
                if (data) {
                    setbooks(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(baseURL + "section/get_sections", {
            method: "GET",
            headers: header,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("sections are==>", data);
                if (data) {
                    setSections(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    const section = (p) => {

        if (p?.assignedSection != null) {
            // <TableCell align="center">{p?.assignedSection?.sectionName}</TableCell>
            return <TableCell align="center">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                    <Select labelId="demo-simple-select-label" id={p?.id.toString()} value={p?.assignedSection?.sectionName} size="small" label="Select Section" onChange={event => handleChange(event, { p })}>
                        <MenuItem value={p?.assignedSection?.sectionName} >{p?.assignedSection?.sectionName}</MenuItem>
                        {
                            sections?.map((section, index) => {
                                if (section.sectionName != p?.assignedSection?.sectionName) {
                                    // console.log("section==>", section.id.toString());
                                    let id = section.id.toString();
                                    return (
                                        <MenuItem value={id} key={id} >{section.sectionName}</MenuItem>
                                    )
                                }
                            })
                        }
                    </Select>
                    <Button variant="contained" size="small" endIcon={<SaveSharpIcon />} onClick={event => saveSection(event, { p })}>Save</Button>
                </FormControl>
            </TableCell>
        }
        else {

            return <TableCell align="center">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Select Section</InputLabel>
                    <Select labelId="demo-simple-select-label" id={p?.id.toString()} size="small" label="Select Section" onChange={event => handleChange(event, { p })}>
                        <MenuItem value="null" selected>Select</MenuItem>
                        {
                            sections?.map((section, index) => {
                                // console.log("section==>", section.id.toString());
                                let id = section.id.toString();
                                return (
                                    <MenuItem value={id} key={id} >{section.sectionName}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <Button variant="contained" size="small" endIcon={<SaveSharpIcon />} onClick={event => saveSection(event, { p })}>Save</Button>
                </FormControl>
            </TableCell>
        }
    }

    return (
        <div>
            <AdminNavBar />

            <span style={{ textAlign: "center" }}>
                    <h1>Books  <AddModal></AddModal> </h1>
                    <br></br>
            </span>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell align="center">Book Id</TableCell>
                            <TableCell align="center">Book Name</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Genre</TableCell>
                            {/* <TableCell align="center">Availability</TableCell> */}
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Section</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            books?.map((p, index) => {
                                return <TableRow key={index}>
                                    <TableCell > {index + 1} </TableCell>
                                    <TableCell align="center">{p?.id}</TableCell>
                                    <TableCell align="center">{p?.name}</TableCell>
                                    <TableCell align="center">{p?.author}</TableCell>
                                    <TableCell align="center">{p?.genre}</TableCell>

                                    <TableCell align="center">
                                        <input
                                            className="pull-right"
                                            type="file"
                                            accept="image/*"
                                            name="img"
                                            id="img"
                                            required
                                            onChange={event => {imageUpload(event, p.id)}}
                                        />
                                    </TableCell>


                                    {/* <TableCell align="center">{p?.isBookBorrowable}</TableCell> */}
                                    {
                                        section(p)
                                    }
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default Admin;
