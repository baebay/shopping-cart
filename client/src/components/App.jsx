import React from 'react';
import Cart from './Cart.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      cart: [],
      display: false,
    };

    this.toggleProductsMenu = this.toggleProductsMenu.bind(this);
  }

  addItemToCart () {
    const event = new CustomEvent('addItemToCart', { detail: { id: 3 }});
    document.dispatchEvent(event);
  }

  componentDidMount () {
    document.addEventListener('addItemToCart', ({ detail }) => {
      axios.post('/api/cart', detail)
      .catch(console.error);
    });

    axios.get('/api/data')
    .then(({ data }) => this.setState({ cart: data }))
    .catch(console.error);
  }

  toggleProductsMenu () {
    this.setState({ display: !this.state.display });
  }

  render () {
    let cartRender;

    if (this.state.display === true) {
      cartRender = <Cart cart={this.state.cart} />;
    }

    return (
      <div>
        <nav>
          <div className="container">
            <ul className="navbar-left">
              <li><a href="#">Hi! Sign in or Register</a></li>
              <li><a href="#">Daily Deals</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Help & Contact</a></li>
            </ul>
            <ul className="navbar-right">
              <li><a href="#">Sell</a></li>
              <li><a href="#">My eBay</a></li>
              <li><a href="#">Notifications</a></li>
              <li><a href="#" onClick={this.toggleProductsMenu}>Cart</a></li>
            </ul>
          </div>
        </nav>

        {cartRender}

        <button onClick={this.addItemToCart}>Add Item to Cart</button>
      </div>
    );
  }
}

export default App;