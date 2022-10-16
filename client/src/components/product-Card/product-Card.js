import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import getProductById from '../../redux/actions/getProductById';
import postProductToCart from '../../redux/actions/postProductToCart';
import clearProductDetails from '../../redux/actions/clearProductDetails';
import Vector from '../../assets/addToCart.png';
import './product-Card.css';

class ProductCard extends Component {

    constructor(props){
        super(props);
        this.state={
            entering: false,
            productId: ''
        }
    }

    addAttrByDefault = (addAttByDefault) => {
        addAttByDefault.attByDefault = addAttByDefault.attributes.map(each => {return {id: each.id, value: each.items[0].value}})
        addAttByDefault.idForDeletion = uuidv4()
        addAttByDefault.quantity = 1
        return addAttByDefault
    }
    onClickNavigation = (productId) => {
        this.props.getProductById(productId)
    }
    onClickCartButton = (selectedProductToAdd) => {
        let copyInDeepSelectedProduct = JSON.parse(JSON.stringify(selectedProductToAdd))
        let copyInDeepPastProducts = this.props.postedProductsToCart.length!==0
            ? JSON.parse(JSON.stringify(this.props.postedProductsToCart))
            : JSON.parse(localStorage.getItem('cart'))
            ? JSON.parse(localStorage.getItem('cart'))
            : []
        
        if (copyInDeepSelectedProduct.attributes && copyInDeepSelectedProduct.attributes.length > 0) {
            this.props.postProductToCart(copyInDeepPastProducts, this.addAttrByDefault(copyInDeepSelectedProduct))
        } else {
            copyInDeepSelectedProduct.attByDefault = []
            copyInDeepSelectedProduct.idForDeletion = uuidv4()
            copyInDeepSelectedProduct.quantity = 1
            this.props.postProductToCart(copyInDeepPastProducts, copyInDeepSelectedProduct)
        }
    }

    render() {

        let currentCurrency = []
        if (this.props.postedCurrentCurrency.length === 0) {
            currentCurrency = [{label: "USD", symbol: "$"}]
        } else {
            currentCurrency = this.props.postedCurrentCurrency
        }

        const price = (prices) => {
            let currentPriceAmount = prices.filter(price => price.currency.symbol === currentCurrency[0].symbol)
            return currentPriceAmount[0].amount
        }

        if (this.props.paginationData.length === 0) {
            return (
                <div className='productCardLoading'>
                    <h2>Loading products...</h2>
                </div>
            )
        }

        const showCartButton = (e, productId) => {
            e.preventDefault()
            this.setState({entering: true, productId: productId || ''})
        }
        const hideCartButton = (e, productId) => {
            e.preventDefault()
            this.setState({entering: false, productId: productId || ''})
        }
        
        return (
            <div className='wraperProductCard'>
                    {this.props.paginationData.map(product => {return (
                        <div    className="productCardMain" 
                                key={product.setId} 
                                onMouseEnter={(e)=>showCartButton(e, product.setId)} 
                                onMouseLeave={(e)=>hideCartButton(e, product.setId)}
                        >
                            <NavLink 
                                onClick={()=> this.onClickNavigation(product.setId)} 
                                to={`/productdetails/${product.setId}`} 
                                className="navlink" 
                                key={product.setId}
                            >
                                <div className={product.inStock ? 'productCardContainer' : 'outOfStock'}>
                                    <div className='imageContainer'>
                                        <img src={product.gallery[0]} alt="view here" className='image'/>
                                        {!product.inStock ? <div className='noStock'> OUT OF STOCK</div> : ''}
                                     </div>

                                    <div className='spacer'></div>
                                    <div className='content'>
                                        <div className='title'>{`${product.brand} ${product.name}`}</div>
                                        <div className='title'>
                                            <div className='element'>
                                                {`${currentCurrency[0].symbol} ${price(product.prices)}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>

                            <div className={this.state.entering && this.state.productId === product.setId ? 'circleIcon' : ''}>
                                {product.inStock
                                ?
                                    <button className='surface' id="cartButton" onClick={()=>this.onClickCartButton(product)}>
                                        <img src={Vector} alt='' className='vector' id="cartButton" />
                                    </button>
                                :
                                ''
                                }
                            </div>
                        </div>
                    )})}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productsByCategory: state.productsByCategory,
        paginationData: state.paginationData,
        postedCurrentCurrency: state.postedCurrentCurrency,
        postedProductsToCart: state.postedProductsToCart,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductById: (productId) => dispatch(getProductById(productId)),
        clearProductDetails: () => dispatch(clearProductDetails()),
        postProductToCart: (pastSelection,currentSelection) => dispatch(postProductToCart(pastSelection, currentSelection)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);