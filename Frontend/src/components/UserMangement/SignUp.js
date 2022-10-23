import React, { useState } from "react";
import UserPool from "./UserPool";
import LoginHeader from "./../common/LoginHeader";
import { useNavigate } from 'react-router-dom';


const base_URL = process.env.REACT_APP_EC2_SERVER_URL;

const Signup = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: "",
        name: ""
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

        UserPool.signUp(state.email, state.password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
        });

        let request = {
            "name": state.name,
            "emailId": state.email,
            "password": state.password
        }
        console.log("base URL==>", base_URL)
        fetch(base_URL + "user/save", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    if (data.status === true) {
                        console.log("routing");
                        // setAuth(isAuth => ({isAuth : data.status}))
                        // console.log(isAuth);
                        navigate("/login")
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });

    };

    return (
        <div>
            <LoginHeader />
            <br /><br />
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center card col-12 col-lg-4 col-md-offset-4'>
                    <h3>New User Signup</h3>
                    <form className='d-flex justify-content-center flex-column p-6 '>
                        <div className="form-group text-left">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter name" value={state.name} onChange={handleChange} />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="email" style={{ marginTop: "1em" }}>Email</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                placeholder="Enter email" value={state.email} onChange={handleChange} />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password" style={{ marginTop: "1em" }}>Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password"
                                value={state.password} onChange={handleChange} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary" style={{ marginTop: "2em" }} onClick={onSubmit}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Signup;