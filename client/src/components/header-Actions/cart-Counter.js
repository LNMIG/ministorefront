import { Component } from "react"
import { connect } from 'react-redux';
import './cart-Counter.css'

export class ItemCounter extends Component {

    constructor(props) {
        super(props);
        this.state={counter: 0}
    }
    componentDidMount() {
        if(JSON.parse(localStorage.getItem('cart'))) {
            let quantity = JSON.parse(localStorage.getItem('cart')).reduce((prev, current) => prev + current.quantity, 0)
            this.setState({counter: quantity})
        }
    }
    
    componentDidUpdate (prevProps, prevState) {
        if(this.props.postedProductsToCart !== prevProps.postedProductsToCart) {
            let quantity = this.props.postedProductsToCart.reduce((prev, current) => prev + current.quantity, 0)
            this.setState({counter: quantity})
            return
        } else if (JSON.parse(localStorage.getItem('cart')) && this.state.counter !== prevState.counter) {
            let quantity = JSON.parse(localStorage.getItem('cart')).reduce((prev, current) => prev + current.quantity, 0)
            this.setState({counter: quantity})
            return
        }
    }

    render () {
        return (
            <div className='counterWrapper'>
                {this.state.counter}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postedProductsToCart: state.postedProductsToCart,
    };
}
export default connect(mapStateToProps, null)(ItemCounter);
