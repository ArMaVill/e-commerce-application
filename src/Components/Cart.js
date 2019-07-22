import React, { Component } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: [1],
      user: this.props.user,
      isAuthenticated: props.isAuthenticated
    };
  }

  render() {
    const items = this.state.items;
    return (
      <div>
        {items.length > 0 ? (
          items.map(item => (
            <div>
              <p>{item.quantity}</p>
              <p>{item.product}</p>
            </div>
          ))
        ) : (
          <div>No hay productos</div>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      axios
        .get(`${API}/user`)
        .then(result => {
          this.setState({
            items: result.data.cart.items,
            isAuthenticated: true
          });
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

export default Cart;
