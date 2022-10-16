import { Component } from "react";
import { Link } from "react-router-dom"
import Logo from '../../assets/a-logo.png';
import './landing.css'

class Landing extends Component {
    render (){
        return (
            <div className="landingContainer">
                <h1>WELCOME TO</h1>
                <img src={Logo} alt='logo goes here' className="logoimage"/>
                <Link className="letsGoShopping" to={'/productslist/all'}>Lets go shopping!</Link>
            </div>
        )
    }
}
export default Landing