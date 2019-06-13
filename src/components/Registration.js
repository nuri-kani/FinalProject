import React, { Component } from "react";
import "./registr.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormErrors } from "./FormErrors";
import { NavLink } from "react-router-dom";
import fire from "../config/Fire";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " не верное имя пароля";
        break;
      case "password":
        passwordValid = value.length >= 5;
        fieldValidationErrors.password = passwordValid
          ? ""
          : " недостаточное количество символов";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "ошибка";
  }
  handleSubmit = event => {
    event.preventDefault();
    const user = {
      emailValid: this.state.email,
      passwordValid: this.state.password
    };
    console.log(user);
    fire
      .auth()
      .signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(u => {
        window.location.replace("/UserPage");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="registr_wrapper">
        <Form>
          <FormGroup>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.email
              )}`}
            >
              <Label for="exampleEmail" />
              <Input
                type="email"
                name="email"
                id="exampleEmailL"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.email
              )}`}
            >
              <Label for="examplePassword" />
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Пароль"
                value={this.state.password}
                onChange={this.handleUserInput}
              />
            </div>
          </FormGroup>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <Button
            disabled={!this.state.formValid}
            type="button"
            onClick={this.handleSubmit}
            className="btn"
          >
            Войти
          </Button>
        </Form>
        <NavLink to="/RegistrationPage"> Зарегистрироваться </NavLink>
      </div>
    );
  }
}

export default Registration;
