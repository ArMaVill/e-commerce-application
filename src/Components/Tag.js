import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';
import axios from 'axios';
import ProductList from './ProductList';

const API = 'http://localhost:3000/api';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.match.params.name,
      isLoading: true
    };
  }

  componentDidMount() {
    this.getProductByTag(this.state.name);
  }

  render() {
    const isLoading = this.state.isLoading;
    return (
      <Container>
        <Row>
          {this.lo}
          {isLoading ? <div>Cargando producto</div> : this.loadedProduct()}
        </Row>
      </Container>
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
    const name = this.toUpper(this.state.name);
    return (
      <React.Fragment>
        <h4>{name}</h4>
        <ProductList products={this.state.products} />
      </React.Fragment>
    );
  }
  toLower(str) {
    return str.toLowerCase();
  }
  toUpper(str) {
    return str.toUpperCase();
  }

  getProductByTag(name) {
    axios
      .get(`${API}/product/tag/${name}`)
      .then(result =>
        this.setState({
          products: result.data.products,
          isLoading: false
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }
}

export default Tag;
