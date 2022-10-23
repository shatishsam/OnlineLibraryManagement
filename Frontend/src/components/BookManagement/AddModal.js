
import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, Toast} from 'reactstrap';
import TextField from '@mui/material/TextField';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const baseURL = process.env.REACT_APP_EC2_SERVER_URL;

class AddModal extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            name: '',
            author: '',
            genre: '',
            file: null,
            modal:false,
            isFormInvalid: false
        };
    }

    imageUpload = (e) => {
        if (e.target.files) {
            this.setState({file: e.target.files[0]});
            // let reader = new FileReader();
            // reader.readAsDataURL(e.target.files[0]);
            //
            // reader.onload = () => {
            //     this.setState({file: reader.result});
            // };
        }
    }

    toggle = () =>{
        console.log("toggle called");
        this.setState({modal: !this.state.modal})
        console.log(this.state);
    }

    validate = () => {
        console.log("validate called", this.state)
        if (this.state.name === "" || this.state.author === "" || this.state.genre===0 || this.state.file===null) {
            console.log("invalidate")
            console.log(this.state)
        } else {

            var bodyFormData = new FormData();
            const bookBody = {name: this.state.name, author: this.state.author, genre: this.state.genre};
            const json = JSON.stringify(bookBody);
            const blob = new Blob([json], {
                type: 'application/json'
            });

            bodyFormData.set('body', blob);
            bodyFormData.set('file', this.state.file);

            console.log(bodyFormData);
            axios({
                method: "post",
                url: baseURL+'books/save',
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((res) => {
                    console.log('Product addition result', res);
                    if (res.status === 200) {
                        console.log('product posted successfully!!!')
                    }
                }).catch(err => {
                console.error(err);
                Toast.error("Something went wrong!");
            }).then(data =>{
                this.toggle();
                window.location.reload();
            });

            console.log("task submited");
        }
    };

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.validate();
    }

    myChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        return(
            <span>
                {/*<Button size="sm" color="primary" onClick={this.toggle}>Add Product</Button>*/}
                <AddCircleTwoToneIcon  onClick={this.toggle}></AddCircleTwoToneIcon >
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Books</ModalHeader>
                    <ModalBody>
                        <TextField
                            error={this.state.name === ""}
                            helperText={this.state.name === "" && "Book name required"}
                            required
                            fullWidth
                            id="lastName"
                            label="Name"
                            name="name"
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.author === ""}
                            helperText={this.state.author === "" && "Book Author required"}
                            required
                            fullWidth
                            id="Product Description"
                            label="Book Author"
                            name="author"
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.genre === ""}
                            helperText={this.state.genre === "" && "Book Genre required"}
                            required
                            fullWidth
                            id="Product brand"
                            label="Book Genre"
                            name="genre"
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <label for="img">Select Product Image: </label>
                        <input
                            className="pull-right"
                            type="file"
                            accept="image/*"
                            name="img"
                            id="img"
                            required
                            onChange={this.imageUpload}
                        />


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                        <Button color="success" onClick={this.onSubmit}>Add Product</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default AddModal;