import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './generalUseButton.css';

class ChameleonButton extends Component {

    render (){
        return (
            <NavLink
                className={this.props.classLink!=='classLinkDenied' ? `${this.props.classLink}` : 'classLinkDenied'}
                onClick={this.props.onClick}
                exact to={`/${this.props.navlink}`}>
                <div
                    className={this.props.class}
                >
                        {this.props.placeholder}
                </div>
            </NavLink>
            
        )
    }
}
export default ChameleonButton