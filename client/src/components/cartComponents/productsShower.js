import { Component } from 'react';
import WrapperLeft from './wrapperLeft';
import WrapperRight from './wrapperRight';
import './productsShower.css';

class ProductsShower extends Component {
    render (){
        
        return (
            <div className={this.props.class}>
                <WrapperLeft product={this.props.product} currentCurrency={this.props.currentCurrency} whereToShow={this.props.whereToShow}/>
                <WrapperRight product={this.props.product} whereToShow={this.props.whereToShow}/>
            </div>
        )
    }
}
export default ProductsShower;