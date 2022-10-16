import { Component } from 'react';
import ContinueShopping from '../../components/checkoutComponents/continueShoppingLink';
import './error404.css';

class Error extends Component {
    render () {
        return (
            <div className="error404Container">
              <div className='Error404'>
                <span className='code'>404</span>
                <h3 className='subtitle'>PAGE NOT FOUND</h3>
                <p>The URL requested was not recognised by the system. The content is not accesible or the url is not correct.</p>
                < ContinueShopping />
              </div>
            </div>
          );
    }
}
export default Error