import { Component } from "react";
import './product-DetailPrice.css'
import './product-DetailPriceMainCart.css'
import './product-DetailPriceMiniCart.css'

class ProductDetailPrice extends Component {

    render () {
        let currencySymbol = this.props.currentCurrency[0].symbol
        const amount = () => {
            let currentAmount = this.props.prices.filter(price => price.currency.symbol === currencySymbol)
            return currentAmount[0].amount
        }

        return (
            <div className={this.props.whereToShow === 'mainCartPD' ? 'mainCartPD' : this.props.whereToShow === 'miniCartPD' ? 'miniCartPD' : "productDetailPriceContainer"}>
                <div className='price'>PRICE:</div>
                <div className='amount'>{`${currencySymbol} ${amount()}`}</div>
            </div>
        )
    }
}

export default ProductDetailPrice