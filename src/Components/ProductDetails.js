import React, { Component } from 'react';
import { Image, Button, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import Login from './login';

const API = 'http://localhost:3000/api';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      isLoading: true,
      isAuthenticated: props.isAuthenticated
    };
  }

  componentDidMount() {
    this.getProductById(this.state.id);
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <Row className="product-details">
        <Container
          fluid
          style={{
            marginLeft: '15%',
            marginRight: '15%'
          }}
        >
          <Row>
            {isLoading ? <div>Cargando producto</div> : this.loadedProduct()}
          </Row>
        </Container>
      </Row>
    );
  }

  getProductById(id) {
    axios
      .get(`${API}/product/${id}`)
      .then(result =>
        this.setState({
          product: result.data.product,
          isLoading: false
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: true
        })
      );
    return this.state.product;
  }

  loadedProduct() {
    const product = this.state.product;
    const tags = product.tags;
    const isAuthenticated = this.state.isAuthenticated;
    return (
      <React.Fragment>
        <div className="col-5">
          <Image src={product.image} thumbnail style={{ height: 'auto' }} />
        </div>
        <div className="col-7">
          <h4>{product.name}</h4>
          <h6>${product.price}</h6>
          <p>{product.description}</p>

          {tags.length > 0 && <h5>Categorias</h5>}
          <Row className="product-tag">
            {tags.length > 0 &&
              tags.map(tag => (
                <Button
                  key={tag._id}
                  className="tag ml-3"
                  variant="secondary"
                  size="sm"
                  href={`/tag/${this.toLowercase(tag.name)}`}
                >
                  {tag.name}
                </Button>
              ))}
          </Row>
          {isAuthenticated ? (
            <Button variant="outline-primary">Anadir al carrito</Button>
          ) : (
            <Row>Inicia sesion para empezar a comprar</Row>
          )}
        </div>
      </React.Fragment>
    );
  }
  toLowercase(str) {
    return str.toLowerCase();
  }
}

export default ProductDetails;
