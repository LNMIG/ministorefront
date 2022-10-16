import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllCurrencies from '../../redux/actions/getAllCurrencies.js';
import postSelectedCurrency from '../../redux/actions/postSelectedCurrency.js';
import Button from './selector-Button';
import CurrencyList from './selector-CurrencyList';
import postBlocker from '../../redux/actions/postBlocker.js';
import '../header-Actions/selector-Currencies.css'

class CurrencySelector extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
            currentCurrency: JSON.parse(sessionStorage.getItem('currentCurrency')) || [{label: "USD", symbol: "$"}],
            }
        this.activatorRef = React.createRef(null)
        this.dropdownListRef = React.createRef(null)
        this.vector = true
    }

    onClickHandler = () => {
        if (!this.props.blocker) this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}))
    }
    
    keyHandler = (event) => {
      if (event.key === "Escape" && this.state.isOpen) {
        this.setState(prevState => ({...prevState, isOpen: false}))
        }
    }

    clickOutsideHandler = (event) => {
        if (this.dropdownListRef.current) {
          if (this.dropdownListRef.current.contains(event.target) || this.activatorRef.current.contains(event.target)) {
          return;
          }
          this.setState(prevState => ({...prevState, isOpen: false}))
          }
    }

    onClickButton = selectedCurrency => {
        this.label = selectedCurrency.target.value.slice(0,3)
        this.symbol = selectedCurrency.target.value.slice(3).trim().trimEnd()
        this.setState(prevState => ({...prevState, currentCurrency: [{label: this.label, symbol: this.symbol}] }))
        this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}));
    }

    componentDidMount() {
        this.props.getAllCurrencies();
        this.props.postSelectedCurrency(this.state.currentCurrency);
      }

    componentDidUpdate(_prevProps, prevState, _snapshot) {
      if (this.state.currentCurrency !== prevState.currentCurrency) {
          this.props.postSelectedCurrency(this.state.currentCurrency);
      }
  
      if(this.state.isOpen !== prevState.isOpen) {
        this.dropdownListRef.current.querySelector("button").focus();
        document.addEventListener("mousedown", this.clickOutsideHandler);
      } else {
        document.addEventListener("mousedown", this.clickOutsideHandler);
      }
    }

    render() {

        const currencies = this.props.allCurrencies
        const currentCurrency = <div className='currencyShow'>
                                    <span className='symbol'>{this.state.currentCurrency[0].symbol}</span>
                                </div>
        const show = (label, symbol) => {
                let combine = `${symbol} ${label}`
                return combine
        }

        return (
            <div className='currencyWrapper' onKeyUp={this.keyHandler}>
              < Button state={this.state} onClick={this.onClickHandler} refference={this.activatorRef} vector={this.vector} currentCurrency={currentCurrency}/>
              {currencies && currencies.length > 0
              ? < CurrencyList dropdownListRef={this.dropdownListRef} state={this.state} show={show} currencies={currencies} onClick={this.onClickButton}/>
              :
             <div>Loading...</div>
            }
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCurrencies: state.allCurrencies,
        blocker: state.blocker,
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCurrencies: () => dispatch(getAllCurrencies()),
        postSelectedCurrency: (selected) => dispatch(postSelectedCurrency(selected)),
        postBlocker: () => dispatch(postBlocker()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
