import React, { Component } from 'react';
import axios from 'axios';
import {
  Modal,
  Toast,
  Container,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap';

const API = 'http://localhost:3000/api';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      validated: false,
      error: false,
      username: '',
      email: '',
      password: '',
      line1: '',
      city: '',
      province: '',
      created: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.showCreated = this.showCreated.bind(this);
    this.setState = this.setState.bind(this);
  }

  handleShow = () =>
    this.setState({
      show: true
    });

  handleClose = () =>
    this.setState({
      show: false
    });

  render() {
    return (
      <Container>
        {this.errorAlert()}
        <Modal.Header>
          <Modal.Title>Registraté!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingLeft: '40px', paddingRight: '40px' }}>
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
            style={{
              justifyContent: 'center',
              marginLeft: '15%',
              marginRight: '15%'
            }}
          >
            <Form.Group as={Row} controlId="formHorizontalUsername">
              <Form.Label column="true" sm="3">
                Nombre
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column="true" sm="3">
                Email
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column="true" sm="3">
                Contraseña
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="password"
                  name="password"
                  maxLength={10}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                password dont match
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column="true" sm="3">
                Confirmar contraseña
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="password"
                  maxLength={10}
                  name="passwordConfirm"
                  value={this.state.passwordConfirm}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalAddress">
              <Form.Label column="true" sm="3">
                Dirección
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="text"
                  name="line1"
                  value={this.state.line1}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalCity">
              <Form.Label column="true" sm="3">
                Ciudad
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalProvince">
              <Form.Label column="true" sm="3">
                Provincia
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  required
                  column="true"
                  sm="6"
                  as="select"
                  name="province"
                  value={this.state.province}
                  onChange={this.handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option>San Jose</option>
                  <option>Alajuela</option>
                  <option>Cartago</option>
                  <option>Heredia</option>
                  <option>Guanacaste</option>
                  <option>Puntarenas</option>
                  <option>Limon</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button variant="outline-success" onClick={this.handleSubmit}>
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Container>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (!form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: false });
    }
    this.setState({ validated: true });
    if (
      this.state.username === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.passwordConfirm === '' ||
      this.state.line1 === '' ||
      this.state.city === '' ||
      this.state.city === ''
    ) {
      this.setState({
        message: 'Debe llenar todos los campos',
        error: true
      });
    } else if (
      this.state.email.split('').filter(x => x === '@').length !== 1 ||
      this.state.email.indexOf('.') === -1
    ) {
      this.setState({
        message: 'El Email es invalido',
        error: true
      });
    } else if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        message: 'Las contraseñas no coinciden',
        error: true
      });
    } else {
      this.registeruser();
    }
  }

  showError() {
    this.setState({
      error: !this.state.error
    });
  }

  showCreated() {
    this.setState({
      created: !this.state.created,
      username: '',
      email: '',
      password: '',
      line1: '',
      city: '',
      province: '',
      passwordConfirm: '',
      validated: false
    });
  }

  registeruser() {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      line1: this.state.line1,
      city: this.state.city,
      province: this.state.province
    };
    axios
      .post(`${API}/user/register`, user)
      .then(response => {
        this.setState({
          user: response.data.user,
          message: response.data.message,
          error: response.data.error
        });

        if (!this.state.error) {
          this.showCreated();
        }
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: error.message,
          error: true
        });
      });
  }

  errorAlert() {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'relative',
          minHeight: '100px'
        }}
      >
        <Toast
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}
          onClose={this.showError}
          show={this.state.error}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{this.state.message}</Toast.Body>
        </Toast>

        <Toast
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}
          onClose={this.showCreated}
          show={this.state.created}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Usuario Creado</strong>
          </Toast.Header>
          <Toast.Body>Ahora puedes iniciar sesion</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default Register;
