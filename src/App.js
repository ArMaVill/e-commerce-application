import React from 'react';
import Navigation from './Components/Navbar';
import ProductList from './Components/ProductList';
import { Container, Row } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails';
import Tag from './Components/Tag';
import Register from './Components/Register';
import axios from 'axios';
import About from './Components/About';
import Contact from './Components/Contact';
import Auth from './Components/auth';

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

  componentWillMount() {
    this.verifyAuthentication();
  }
  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Navigation
              {...props}
              isAuthenticated={this.state.isAuthenticated}
              authenticate={this.authenticate}
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
              render={props => (
                <ProductDetails
                  {...props}
                  isAuthenticated={this.state.isAuthenticated}
                />
              )}
            />
            <Route path="/tag/:name" render={props => <Tag {...props} />} />
            <Route path="/about" render={props => <About {...props} />} />
            <Route path="/contact" render={props => <Contact />} />
            <Route path="/register" render={props => <Register {...props} />} />
            <Route path="/auth" render={props => <Auth {...props} />} />
          </Row>
        </Container>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
    this.getProducts();
  }

  verifyAuthentication = () => {
    const token = localStorage.getItem('token');
    if (token) this.setState({ isAuthenticated: true });
  };

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

  getProductByTag(name) {
    let x;
    axios
      .get(`${API}/product/tag/${name}`)
      .then(result => (x = result.data.products))
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }
}

export default App;
