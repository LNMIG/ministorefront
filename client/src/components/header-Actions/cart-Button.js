import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiniCart from '../cartMiniModule/miniCartMain.js';
import postBlocker from '../../redux/actions/postBlocker.js';
import Cart from '../../assets/shoppingcartempty.svg'
import './cart-Button.css'

export class CartButton extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    onClick = (event) => {
        this.props.postBlocker()
        this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}));
    }

    keyHandler = (event) => {
        if (event.key === "Escape" && this.props.blocker) {
          this.props.postBlocker()
          }
      }

    clickOutsideHandler = (event) => {
        if(event.target.className === 'headerDesktopContainer' || event.target.className === 'blocker') {
            if(this.props.blocker) {
                this.props.postBlocker()
                document.removeEventListener("mousedown", this.clickOutsideHandler);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        document.addEventListener("mousedown", this.clickOutsideHandler);
    }
    componentWillUnmount () {
        document.removeEventListener("mousedown", this.clickOutsideHandler);
    }

    render () {
        return (
            <div onKeyUp={this.keyHandler}>
                <button className='cart' onClick={this.onClick}>
                    <img className='carticon' src={Cart} alt='' />
                </button>

                { this.props.blocker ? <MiniCart /> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blocker: state.blocker,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postBlocker: () => dispatch(postBlocker()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
