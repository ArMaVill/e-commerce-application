import React, { Component } from 'react';

import Product from './Product';
import { Row } from 'react-bootstrap';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products
    };
  }

  render() {
    const products = this.props.products;

    return (
      <React.Fragment>
        <Row style={{ width: '100%' }}>
          {products.length < 0 ? (
            <div>opps</div>
          ) : (
            products.map(product => (
              <Product
                key={product._id}
                _id={product._id}
                price={product.price}
                image={product.image}
                name={product.name}
              />
            ))
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default ProductList;
