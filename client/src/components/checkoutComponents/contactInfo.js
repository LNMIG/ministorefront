import { Component } from "react";
import './contactInfo.css'

class ContactInfo extends Component {
    render() {
        return (
            <div className="contatcInfoWrapper">
                <label className="label">Contact information</label>
                <input placeholder='Email or mobile phone number' className='input'></input>
            </div>
        )
    }
}
export default ContactInfo