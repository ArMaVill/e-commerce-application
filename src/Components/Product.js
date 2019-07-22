import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      name: props.name,
      price: props.price,
      image: props.image
    };
  }

  render() {
    return (
      <Card className="product col-10 col-sm-5s col-md-3 col-lg-2 m-1">
        <a href={`/product/${this.state._id}`}>
          <Card.Img
            variant="top"
            src={this.state.image}
            thumbnail="true"
            style={{ height: 'auto' }}
          />
        </a>
        <Card.Body>
          <Card.Text>{this.state.name}</Card.Text>
        </Card.Body>
        <Card.Footer>${this.state.price}</Card.Footer>
      </Card>
    );
  }
}

export default Product;
