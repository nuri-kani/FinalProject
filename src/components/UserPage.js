import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import "./userpage.css";
import fire from "../config/Fire";
//import { NavLink } from "react-router-dom";

class UserPage extends Component {
  constructor() {
    super();
    this.ref = fire.firestore().collection("test");
    this.unsubscribe = null;
    this.state = {
      servers: []
    };
    this.routeChange = this.routeChange.bind(this);
    this.logout = this.logout.bind(this);
  }
  onCollectionUpdate = querySnapshot => {
    const servers = [];
    querySnapshot.forEach(doc => {
      const { server_name,ip, password, login, desc } = doc.data();
      servers.push({
        key: doc.id,
        server_name,
        ip,
        password,
        login,
        desc
      });
    });
    this.setState({
      servers
    });
    console.log(this.state.servers);
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  routeChangeBtnHeader() {
    let path = `/`;
    this.props.history.push(path);
  }
  logout() {
    fire.auth().signOut();
    this.props.history.push('/');
  }
  routeChange() {
    let path = `/DataPage`;
    this.props.history.push(path);
  }
  render() {
    return (
      <div >
        <div className="header">
        <Button 
        className="btn_header" 
        onClick={this.logout}>Выйти</Button>
       </div>
      <div className="tableGroup">
        <Table bordered>
            <thead>
              <tr>
                <th>Server Name</th>
                <th>IP</th>
                <th>Login</th>
                <th>Password</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.servers.map((server,i )=> {
                return (
                  <tr key={i}>
                    
                    <td>{ server.ip}
                    </td>
                    <td>{ server.server_name}
                    </td>
                    <td>{ server.login}
                    </td>
                    <td>{ server.password}
                    </td>
                    <td>{ server.desc}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button
          type="button"
          onClick={this.routeChange}
          className="btn"
        >Добавить
        </Button>
      </div>
    </div>
    );
  }
}
export default UserPage;
