import { Component } from "react";
import './selector-CurrencyList.css'

class CurrencyList extends Component {

render () {
    return (
        <ul
        ref={this.props.dropdownListRef}
        className={`currencyItemList ${this.props.state.isOpen ? 'active' : ""} `}
        >

        {this.props.currencies.map((currency, index) => {
          return (
            <li className='currencyList' key={index}>
              <button type='button' value={`${currency.label} ${currency.symbol}`} onClick={this.props.onClick}>
                {this.props.show(currency.label,currency.symbol)}
              </button>
            </li>
          );
        })}

        </ul>
    )
}
}
export default CurrencyList