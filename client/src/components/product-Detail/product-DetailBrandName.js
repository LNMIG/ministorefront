import { Component } from "react";
import './product-DetailBrandName.css'
import './product-DetailBrandNameMainCart.css'
import './product-DetailBrandNameMiniCart.css'

class ProductDetailBrandName extends Component {

    render () {
        
        return (
            <div className={this.props.whereToShow === 'mainCartBN' ? 'mainCartBN' : this.props.whereToShow === 'miniCartBN' ? 'miniCartBN' : 'bn'}>
                <div className='brand'>{this.props.brand}</div>
                <div className='name'>{this.props.name}</div>
            </div>
        )
    }
}

export default ProductDetailBrandName