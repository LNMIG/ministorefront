import { Component } from "react";
import { connect } from 'react-redux';
import Blocker from '../../components/blocker/blocker.js'
import MainCart from "../../components/cartMainModule/cartMain";
import HeaderDesktop from '../../components/header-Desktop/header-Desktop';
import './cart.css'

class Cart extends Component {

    render (){
        return (
            <div className="cartWrapper">
                < HeaderDesktop />
                <div className="mainCartContainer">
                    <MainCart />
                </div>
                { this.props.blocker? < Blocker/> : null }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        blocker: state.blocker,
    };
}
export default connect(mapStateToProps, null)(Cart)