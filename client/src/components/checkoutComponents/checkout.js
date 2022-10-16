import { Component } from "react";
import { connect } from "react-redux";
import ProductBought from "./productBought";
import Shipping from './shipping';
import PriceTaxes from '../cartComponents/priceShower';
import CheckoutLogo from "./checkoutLogo";
import ExpressCheckout from "./expressCheckout";
import Divider from "./divider";
import ContactInfo from './contactInfo';
import ShippingAddress from './shippingAddress'
import CheckoutButtonContainer from './buttonContainer'
import ContinueShopping from './continueShoppingLink'
import './checkout.css';

class MainScreener extends Component {
    render (){
         return (
            <div className="mainScreener">
                <div className="left">
                    {this.props.checkoutProducts && this.props.checkoutProducts.length > 0
                    ? <>
                        < CheckoutLogo />
                        < ExpressCheckout />
                        < Divider />
                        < ContactInfo />
                        < ShippingAddress />
                        < CheckoutButtonContainer />
                      </>
                    : <>
                        < CheckoutLogo />
                        <div className="noaction">There is no action to fulfill</div>
                        < ContinueShopping />
                      </>
                    }
                </div>

                <div className="right">
                    {this.props.checkoutProducts && this.props.checkoutProducts.length > 0
                    ? this.props.checkoutProducts.map((each, index) =>
                            < ProductBought
                                key={index}
                                product={each}
                            />)
                    : <div className="noproduct">There is no product to purchase</div>
                    }
                    {this.props.checkoutProducts && this.props.checkoutProducts.length > 0
                    ? <>
                        < Shipping />
                        < PriceTaxes
                            products={this.props.checkoutProducts}
                            currentCurrency={[this.props.checkoutProducts[0].prices[0].currency]}
                            typo={'checkout'}
                        />
                      </>
                    : null
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProp = (state) => {
    return {
        checkoutProducts: state.checkoutProducts,
    }
}
export default connect(mapStateToProp, null)(MainScreener)