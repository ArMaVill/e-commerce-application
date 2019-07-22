import React from 'react';
import Navigation from './Components/Navbar';
import ProductList from './Components/ProductList';
import { Container, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails';
import Tag from './Components/Tag';
import Register from './Components/Register';
import axios from 'axios';
import About from './Components/About';
import Contact from './Components/Contact';
import Cart from './Components/Cart';

const API = 'http://localhost:3000/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false
    };
    this.setState = this.setState.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Navigation
              {...props}
              user={{ username: 'la concha', cart: { items: [] } }}
            />
          )}
        />

        <Container fluid className="content">
          <header className="App-header"></header>
          <Row style={{ minHeight: '800px' }}>
            <Route
              exact
              path="/"
              render={props => (
                <Container
                  fluid
                  style={{
                    marginLeft: '10%',
                    marginRight: '10%'
                  }}
                >
                  <ProductList {...props} products={this.state.products} />
                  <ProductList {...props} products={this.state.products} />
                  <ProductList {...props} products={this.state.products} />
                  <ProductList {...props} products={this.state.products} />
                  <ProductList {...props} products={this.state.products} />
                </Container>
              )}
            />
            <Route
              path="/product/:id"
              render={props => <ProductDetails {...props} />}
            />
            <Route path="/tag/:name" render={props => <Tag {...props} />} />
            <Route path="/about" render={props => <About {...props} />} />
            <Route path="/contact" render={props => <Contact />} />
            <Route path="/register" render={props => <Register {...props} />} />
            <Route
              path="/user/cart"
              render={props => <Cart {...props} user={this.state.user} />}
            />
          </Row>
        </Container>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.getProducts();
  }

  getProducts() {
    axios
      .get(`${API}/product`)
      .then(result =>
        this.setState({
          products: result.data.products,
          isLoading: true
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  getAuthUser() {
    const token = localStorage.getItem('token');

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

export default App;
