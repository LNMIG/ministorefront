import { Component } from "react"
import ContinueToShippingButton from '../cartComponents/generalUseButton'
import ReturnToCartButton from '../cartComponents/generalUseButton'
import './buttonContainer.css'

class CheckoutButtonContainer extends Component {
    render () {
        return (
            <div className="chekoutButtonsContainer">
                <ContinueToShippingButton
                    classLink={'classLink'}
                    navlink={'checkout'}
                    class={'continueToShipping'}
                    placeholder={'Continue to shipping'}
                    onClick={()=>{}}
                />
                <ReturnToCartButton
                    classLink={'classLink'}
                    navlink={'cart'}
                    class={'returnToCart'}
                    placeholder={'Return to cart'}
                    onClick={()=>{}}/>
            </div>
        )
    }
}
export default CheckoutButtonContainer
