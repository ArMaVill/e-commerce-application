import React, { Component } from 'react';
import Login from './login';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { Navbar, Nav, NavDropdown, Button, Badge } from 'react-bootstrap';
const API = 'http://localhost:3000/api';

class Navigtion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      user: { username: '', cart: { items: [] } }
    };
  }
  componentWillMount() {
    this.getAuthUser();
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;

    return (
      <div>
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="/">DekuShopCR</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">Acerca de Nosotros</Nav.Link>
              <Nav.Link href="/contact">Contactenos</Nav.Link>
            </Nav>

            <Nav className="mr-1">
              {this.state.user ? (
                this.user()
              ) : (
                <Route render={props => this.login(props)} />
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

  user() {
    return (
      <React.Fragment>
        <Navbar.Text>Bienvenido:</Navbar.Text>
        <NavDropdown
          style={{ display: 'inline' }}
          title={this.state.user.username}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#action/3.2">
            Perfil de Usuario
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">
            Historial de Ordenes
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              localStorage.removeItem('token');
              this.setState({ isAuthenticated: false });
              this.props.history.push('/');
            }}
          >
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
        <Button variant="outline-secondary" href="/user/cart">
          <Badge variant="secondary" className="mr-1">
            {this.state.user.cart.items.length}
          </Badge>
          Ver Carrito
        </Button>
      </React.Fragment>
    );
  }
  authenticate = redirect => {
    this.setState({ isAuthenticated: true });
    redirect();
  };

  login(props) {
    return (
      <React.Fragment>
        <Login className="mr-1" {...props} authenticate={this.authenticate} />
        <Button className="ml-3" variant="outline-success" href="/register">
          Registraté!
        </Button>
      </React.Fragment>
    );
  }

  getAuthUser() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      axios
        .get(`${API}/user`)
        .then(result => {
          this.setState({ user: result.data, isAuthenticated: true });
          console.log(result);
        })
        .catch(error =>
          this.setState({
            error,
            isLoading: false
          })
        );
    }
  }
}

export default Navigtion;
