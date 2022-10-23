import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import UserNavBar from "./user-header";
import AdminNavBar from "./admin-header";

export function Reports (){

    const [report, setReport] = useState({});

    React.useEffect(() => {
        axios.get('https://x3d2ytlz78.execute-api.us-east-1.amazonaws.com/generateReport').then(res=>{
            console.log(res.data);
            setReport(res.data);
        })
    }, []);


    return(
        <div>
            <AdminNavBar />
            <br></br>
            <br></br>

            <h2>LMS Report (Generated Using Lambda)</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Total Users</TableCell>
                            <TableCell align="center">Total Books</TableCell>
                            <TableCell align="center">Total Sections</TableCell>
                            <TableCell align="center">Borrowed Books</TableCell>
                            <TableCell align="center">Books Available To Borrow</TableCell>
                            <TableCell align="center">Books Assigned To Sections</TableCell>
                            <TableCell align="center">Books Not Assigned To Sections</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow>
                                <TableCell align="center">{report.user_count}</TableCell>
                                <TableCell align="center">{report.book_count}</TableCell>
                                <TableCell align="center">{report.section_count}</TableCell>
                                <TableCell align="center">{report.borrowed_book_count}</TableCell>
                                <TableCell align="center">{report.available_book_count}</TableCell>
                                <TableCell align="center">{report.assigned_books}</TableCell>
                                <TableCell align="center">{report.not_assigned_books}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};