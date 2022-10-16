import { Component } from "react";
import './shippingAddress.css'

class ShippingAddress extends Component {
    render() {
        return (
            <div className="shippingAddressWrapper">
                <label className="label">{`Shipping address (PO Boxes are not available for shipping)`}</label>
                <div className="namesContainer">
                    <input placeholder='First name' className='flName'></input>
                    <input placeholder='Last name' className='flName'></input>
                </div>
                <input placeholder='Address' className='address'></input>
                <input placeholder='Apartment, suite, etc. (optional)' className='address'></input>
                <input placeholder='City' className='address'></input>
                <div className="selectsContainer">
                    <select className="select" placeholder="Country/Region">
                        <option>Country/Region</option>
                    </select>
                    <select className="select" placeholder="State">
                        <option>State</option>
                    </select>
                    <input className="zipcode" placeholder='ZIP code'></input>
                </div>
                <input placeholder='Mobile Phone Number' className='address'></input>
            </div>
        )
    }
}
export default ShippingAddress