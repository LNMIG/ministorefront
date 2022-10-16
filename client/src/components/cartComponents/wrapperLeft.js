import { Component } from 'react';
import BrandName from '../product-Detail/product-DetailBrandName'
import ProductDetailPrice from '../product-Detail/product-DetailPrice';
import ProductDetailAttribute from '../product-Detail/product-DetailAttribute';
import './wrapperLeft.css';

class WrapperLeft extends Component {
    
    render (){
        return (
            <div className={this.props.whereToShow === 'mainCart' ? 'wrapperLeftMainCart' : this.props.whereToShow === 'miniCart' ? 'wrapperLeftMiniCart' : 'wrapperLeft'}>
                <BrandName 
                    brand={this.props.product.brand}
                    name={this.props.product.name}
                    whereToShow={this.props.whereToShow === 'mainCart' ? 'mainCartBN' : 'miniCartBN'}
                />
                <ProductDetailPrice
                    currentCurrency={this.props.currentCurrency}
                    prices={this.props.product.prices}
                    whereToShow={this.props.whereToShow === 'mainCart' ? 'mainCartPD' : 'miniCartPD'}
                />
                <ProductDetailAttribute
                    attributes={this.props.product.attributes}
                    state={this.props.product.attByDefault}
                    idForDeletion={this.props.product.idForDeletion}
                    whereToShow={this.props.whereToShow === 'mainCart' ? 'mainCartPA' : 'miniCartPA'}
                />
            </div>
        )
    }
}
export default WrapperLeft