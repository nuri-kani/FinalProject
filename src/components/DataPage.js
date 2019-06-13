import React, { Component } from "react";
import "./registrationPage.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import fire from "../config/Fire";


class DataPage extends Component {
  constructor() {
    super();
    this.ref = fire.firestore().collection('test');
    this.state = {
      server_name: "",
      ip: "",
      login: "",
      password: "",
      desc: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state)
    const { server_name, ip, login, password, desc } = this.state;
    this.ref.add({
        server_name,
        ip,
        login,
        password,
        desc
      }).then((docRef) => {
        this.props.history.push("/UserPage")
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="RegistrationPage_wrapper">
        <Form>
          <FormGroup>
            <Label for="exampleName">Server name</Label>
            <Input
              type="text"
              name="server_name"
              id="exampleName"
              placeholder="Server name"
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleName">IP</Label>
            <Input
              type="text"
              name="ip"
              id="exampleName"
              placeholder="IP"
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleLogin">Login</Label>
            <Input
              type="text"
              name="login"
              id="exampleLogin"
              placeholder="Login"
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Description</Label>
            <Input
              type="text"
              name="desc"
              id="examplePassword"
              placeholder="Description"
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <Button
            type="button"
            onClick={this.handleSubmit}
            className="btn"
          >Добавить
          </Button>
        </Form>
      </div>
    );
  }
}

export default DataPage;
