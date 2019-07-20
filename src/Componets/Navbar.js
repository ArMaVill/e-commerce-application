import React, { Component } from 'react';
import cartIcon from '../icons/baseline-shopping_cart-24px.svg';
import searchIcon from '../icons/baseline-search-24px.svg';
import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  FormControl,
  Button
} from 'react-bootstrap';

class Navigtion extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Video Game Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form inline className="mr-4">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">
                <img src={searchIcon} alt="logo"></img>
                Buscar
              </Button>
            </Form>
            <Nav className="mr-1">
              <Navbar.Text>Bienvenido:</Navbar.Text>

              <NavDropdown
                Style={{ display: 'inline' }}
                title="Arturo Madrigal"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.2">
                  Perfil de Usuario
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Historial de Ordenes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-secondary">
                <img src={cartIcon} alt="logo"></img>
                Ver Carrito
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigtion;
