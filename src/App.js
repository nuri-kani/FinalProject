import React from 'react';
import './App.css';
import Mainpage from './components/AccountPage';
import Registr from './components/Registration';
import RegistrationPage from './components/RegistrationPage';
import UserPage from './components/UserPage';
import DataPage from './components/DataPage';
import fire from './config/Fire';
import {BrowserRouter as Router,withRouter,  Route} from "react-router-dom"; 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        if(window.location.pathname==='/'){
          window.location.replace("/UserPage");
        }
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Registr} ></Route>
          <Route path="/RegistrationPage" component={RegistrationPage} ></Route>
          <Route path="/AccountPage" component={Mainpage} ></Route>
          <Route path="/UserPage" component={UserPage} ></Route>
          <Route path="/DataPage" component={DataPage} ></Route>
        </div>
      </Router>
       
      
    ); 
  }
}

export default App;