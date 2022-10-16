import { Component } from 'react';
import { connect } from 'react-redux';
import putNewProductAttributes from '../../redux/actions/putNewProductAttributes'
import removeProductFromCart from '../../redux/actions/removeProductFromCart';
import './productQuantityMainCart.css';
import './productQuantityMiniCart.css';
class ProductQuantityWrapper extends Component {

    constructor(props) {
        super(props);
        this.state={
            remove: false,
        }
    }

    remove = (selected) => {
        this.props.removeProductFromCart(selected)
        this.setState(state => ({...state, remove: false}))
    }

    onClickSquare = (selected) => {
        if (selected.target.name === 'plus') {
            let postedProductsToCart = this.props.postedProductsToCart.length!==0 ? this.props.postedProductsToCart : JSON.parse(localStorage.getItem('cart'))
            this.props.putNewProductAttributes(
                postedProductsToCart,
                this.props.product.idForDeletion,
                {quantity: this.props.product.quantity + 1}
                )
        } else {
            if (this.props.product.quantity === 1) {
                this.setState(state => ({...state, remove: true}))
            } else {
                let postedProductsToCart = this.props.postedProductsToCart.length!==0 ? this.props.postedProductsToCart : JSON.parse(localStorage.getItem('cart'))
                this.props.putNewProductAttributes(
                    postedProductsToCart,
                    this.props.product.idForDeletion,
                    {quantity: this.props.product.quantity - 1}
                    )
            }
        }
    }

    onClickRemove = (selected) => {
        selected.target.name=== 'YES'
        ? this.remove(selected.target.value)
        : this.setState(state => ({...state, remove: false}))
    }

    render (){

        return (
            <div className={this.props.whereToShow === 'mainCart' ? 'productQuantityWrapperMainCart' : 'productQuantityWrapperMiniCart'}>
                <button name='plus'className='square' onClick={this.onClickSquare}>
                    +
                </button>

                <span className='productQuantity'>
                    {this.props.product.quantity}
                </span>

                <button name='minus' className='square' onClick={this.onClickSquare}>
                    -
                </button>

                <span name='remove' className={this.state.remove? 'remove' : 'keep'}>
                    <p>Do you really want to remove this product from your bag?</p>
                    <div className='buttonsContainer'>
                        <button name='YES'value={this.props.product.idForDeletion} className='buttons' onClick={this.onClickRemove}>YES</button>
                        <button name='NO' value={this.props.product.idForDeletion} className='buttons' onClick={this.onClickRemove}>NO</button>
                    </div>
                </span>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        postedProductsToCart: state.postedProductsToCart,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        putNewProductAttributes: (pack, id, attribute) => dispatch(putNewProductAttributes(pack, id, attribute)),
        removeProductFromCart: (idForDeletion) => dispatch(removeProductFromCart(idForDeletion)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantityWrapper)