import React, { Component } from 'react';
import { Modal, Alert, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API = 'http://localhost:3000/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      email: '',
      password: '',
      alert: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let show;
    if (this.state.show) {
      show = true;
    } else {
      show = false;
    }
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Inicia Sesion
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ paddingLeft: '40px', paddingRight: '40px' }}>
            {this.messageAlert()}
            <Form>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    value={this.state.email}
                    name="email"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Password"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  handleSubmit = () => {
    const loginDetais = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(`${API}/auth/login`, loginDetais)
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data.user,
          message: response.data.message,
          error: response.data.error,
          token: response.data.token,
          alert: true
        });
        if (this.state.error) {
          this.setState({
            alert: true
          });
        } else {
          localStorage.setItem('token', this.state.token);

          this.props.authenticate(this.state.user, this.state.token, () =>
            this.props.history.push({
              pathname: '/',
              state: { isAuthenticated: true }
            })
          );
          this.handleClose();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleShow = () =>
    this.setState({
      show: true
    });

  handleClose = () =>
    this.setState({
      show: false
    });

  setShow() {
    this.setShow({ alert: !this.state.alert });
  }
  messageAlert() {
    return (
      <div>
        <div>
          {this.state.error && (
            <Alert
              variant="danger"
              onClose={this.setShow}
              show={this.state.alert}
              dismissible
            >
              <Alert.Heading>Ha ocurrido unn error!</Alert.Heading>
              <p>{this.state.message}</p>
            </Alert>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
