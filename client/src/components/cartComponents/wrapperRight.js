import { Component } from 'react';
import ProductQuantity from './productQuantity';
import ImageSlider from './imagesSlider';
import './wrapperRight.css';

class WrapperRight extends Component {
    render (){
        
        return (
            <div className={this.props.whereToShow === 'mainCart' ? 'wrapperRightMainCart' : this.props.whereToShow === 'miniCart' ? 'wrapperRightMiniCart' : 'wrapperRight'}>
                <ProductQuantity 
                    product={this.props.product}
                    whereToShow={this.props.whereToShow}
                />
                <ImageSlider
                    product={this.props.product}
                    whereToShow={this.props.whereToShow}
                />
            </div>
        )
    }
}
export default WrapperRight