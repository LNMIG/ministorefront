import { Component } from "react";
import { connect } from "react-redux";
import checkoutProducts from "../../redux/actions/checkoutProducts";
import Checkout from '../../components/checkoutComponents/checkout';
import './checkoutMain.css'

export class CheckoutMain extends Component {

    componentDidMount() {
        let postedProductsToCart = this.props.postedProductsToCart.length!==0 ? this.props.postedProductsToCart : JSON.parse(localStorage.getItem('cart'))
        let postedCurrentCurrency = this.props.postedCurrentCurrency.length!==0 ? this.props.postedCurrentCurrency: JSON.parse(sessionStorage.getItem('currentCurrency'))
        this.props.checkoutProducts(postedProductsToCart, postedCurrentCurrency)
    }

    render() {
        return ( 
            <div className="checkoutContainer">
                <Checkout />
            </div>
        );
    };
};
const mapStateToProp = (state) => {
    return {
        postedCurrentCurrency: state.postedCurrentCurrency,
        postedProductsToCart: state.postedProductsToCart,
    }
}
const mapDispatchToProp = (dispatch) => {
    return {
        checkoutProducts: (products, currency) => dispatch(checkoutProducts(products, currency)),
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(CheckoutMain)