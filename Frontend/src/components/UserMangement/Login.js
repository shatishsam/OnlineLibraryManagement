import React, { useState } from "react";
import UserPool from "./UserPool";
import LoginHeader from "./../common/LoginHeader";
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Typography } from "@mui/material";
import axios from "axios";

const Login = () => {
    const baseURL = `http://lmsbackendv2-env.eba-ybvchve3.us-east-1.elasticbeanstalk.com/`;
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    console.log(baseURL)
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: state.email,
            Pool: UserPool
        });


        const authDetails = new AuthenticationDetails({
            Username: state.email,
            Password: state.password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
                axios.get(baseURL + `user/getuserdetails?emailId=` + state.email)
                    .then(data => {
                        // console.log("login response")
                        console.log(data.data.id)
                        localStorage.setItem('userId', data.data.id)
                    })
                if (state.email === "gandhirajan1997@gmail.com") {
                    navigate("/admin")
                }
                else {
                    navigate("/sections")
                }
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
            },
            newPasswordRequired: (data) => {
                console.log("new Password Required: ", data);
            }
        });
    };

    return (
        // <div>
        //     <form onSubmit={onSubmit}>
        //         <label htmlFor="email">Email</label>
        //         <input value={email} onChange={(event) => setEmail(event.target.value)} ></input>
        //         <label htmlFor="password">Password</label>
        //         <input value={password} onChange={(event) => setPassword(event.target.value)} ></input>
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
        <div>
            <LoginHeader />
            <br /><br />
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center card col-12 col-lg-4 col-md-offset-4'>
                    <h3>Login</h3>
                    <form className='d-flex justify-content-center flex-column p-6 '>
                        <div className="form-group text-left">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                placeholder="Enter email" value={state.email} onChange={handleChange} />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="exampleInputPassword1" style={{ marginTop: "1em" }}>Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password"
                                value={state.password} onChange={handleChange} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: "2em" }} onClick={onSubmit}>
                                Login
                            </button>
                            <br></br>
                            <Typography variant="span" component="span" style={{}}>
                                <Link to="/signup" style={{ textDecoration: "none", color: "rgb(63, 81, 181)" }}>
                                    New User?
                                </Link>
                            </Typography>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Login;