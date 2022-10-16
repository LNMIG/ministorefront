import { Component } from "react";
import Paypal from '../../assets/paypal-logo.svg'
import shopPay from '../../assets/ShopPayWhite.svg'
import './expressCheckout.css'

class ExpressCheckout extends Component {
    render () {
        return (
            <div className="expressCheckoutContainer">
                <button className="shopPay">
                    <img src={shopPay} alt='shopPay' className="image"></img>
                </button>

                <button className="PayPal">
                    <img src={Paypal} alt='paypal' className="image"></img>
                </button>
                
                <div className="title">Express checkout</div>
            </div>
        )
    }
}
export default ExpressCheckout