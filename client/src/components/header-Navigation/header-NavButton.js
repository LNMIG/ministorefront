import { Component } from "react";
import { NavLink } from 'react-router-dom';
import './header-Navigation.css';

class NavigationButton extends Component {

render () {
    return (
        <NavLink exact to={`/productslist/${this.props.name}`} className='navlink'>
            <button
                id={this.props.id}
                name={this.props.name}
                type='button'
                className={this.props.buttonSelected === this.props.id.toString() ? 'headerNavigationClass1' : 'headerNavigationClass2'}
                onClick={(e)=>this.props.onClick(e)}
            >
                {this.props.name}
            </button>
        </NavLink>
    );
}
}
export default NavigationButton