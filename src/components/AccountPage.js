import React, {Component} from 'react';
import './registr.css';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';


class AccountPage extends Component {
  
     render() {
      return (
        <div className="RegistrationPage_wrapper">
          <h1>Личный кабинет</h1>
          <hr/>
          <Form>
            <FormGroup>
              <Label for="exampleName">Имя</Label>
              <Input
                type="text"
                name="firstname"
                id="exampleName"
                placeholder="Нуриля"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Фамилия</Label>
              <Input
                type="text"
                name="lastname"
                id="exampleName"
                placeholder="Айтакунова"
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
            <Button
              type="button"
              className="btn"
            >Сохранить
            </Button>
            <Button
              type="button"
              className="btn"
            >Отменить
            </Button>
          </Form>
        </div>
      );
    }
  }


export default AccountPage;
