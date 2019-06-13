import React, { Component } from "react";
import "./registrationPage.css";
import { Button, Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { FormErrors } from "./FormErrors";
import axios from "axios";
//import { NavLink } from "react-router-dom";

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname:"",
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      nameValid: false,
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
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 0;
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " не верное имя пароля";
        break;
      case "password":
        passwordValid = value.length >= 8;
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
        nameValid: nameValid,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "ошибка";
  }
  handleSubmit = event => {
    event.preventDefault();
    const user = {
      emailValid: this.state.emailValid,
      passwordValid: this.state.passwordValid
    };

    axios.post(`${axios.defaults.baseURL}/`, { user }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="RegistrationPage_wrapper">
        <Form>
          <FormGroup>
            <Label for="exampleName">Имя</Label>
            <Input
              type="text"
              name="firstname"
              id="exampleName"
              placeholder="Напишите имя"
              value={this.state.name}
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleName">Фамилия</Label>
            <Input
              type="text"
              name="lastname"
              id="exampleName"
              placeholder="Напишите фамилию"
              value={this.state.name}
              onChange={this.handleUserInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Дата рождения</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="Напишите дату рождения"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Пол</Label>
            <div className="gender">
              <CustomInput
                type="radio"
                id="exampleCustomRadio"
                name="customRadio"
                label="Мужской"
              />
              <CustomInput
                type="radio"
                id="exampleCustomRadio2"
                name="customRadio"
                label="Женский"
              />
            </div>
          </FormGroup>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <FormGroup>
            <Label for="exampleEmail">Желаемый почтовый адресс</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleUserInput}
            />
          </FormGroup>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <FormGroup>
            <Label for="examplePassword">Пароль</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handleUserInput}
            />
          </FormGroup>
          </div>
          <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
        </div>
          <Button
            disabled={!this.state.formValid}
            type="button"
            onSubmit={this.handleSubmit}
            className="btn"
          >
            Войти
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegistrationPage;
