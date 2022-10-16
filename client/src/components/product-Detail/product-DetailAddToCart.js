import { Component } from "react";
import './product-DetailAddToCart.css'

class ProductDetailAddToCart extends Component {

    render () {
        
        return (
            <button 
                className={this.props.disabled ? 'notInStock' : 'inStock'}
                onClick={this.props.onClick} 
                disabled={this.props.disabled}
            >
                {this.props.placeholder}
            </button>
        )
    }
}

export default ProductDetailAddToCart