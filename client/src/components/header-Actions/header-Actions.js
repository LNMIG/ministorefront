import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllCurrencies from '../../redux/actions/getAllCurrencies';
import CurrencySelector from './selector-Currencies.js';
import CartButton from './cart-Button.js';
import CartCounter from './cart-Counter.js';
import './header-Actions.css';
export class HeaderActions extends Component {

    componentDidMount() {
        this.props.getAllCurrencies();
    }

    render() {
        return (
            <div className='headerActionsContainer'>
                <CurrencySelector />
                <CartButton />
                <CartCounter />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCurrencies: state.allCurrencies
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCurrencies: () => dispatch(getAllCurrencies()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderActions);