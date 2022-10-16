import { Component } from "react";
import Logo from '../../assets/a-logo.png'
import './checkoutLogo.css'

class CheckoutLogo extends Component {
    render () {
        return (
            <div className="checkoutLogo">
                <img src={Logo} alt='other view' className="image"/>
            </div>
        )
    }
}
export default CheckoutLogo