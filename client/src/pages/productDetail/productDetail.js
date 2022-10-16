import { v4 as uuidv4 } from 'uuid'
import { connect } from "react-redux";
import React, { Component } from "react";
import getProductById from '../../redux/actions/getProductById';
import postProductToCart from '../../redux/actions/postProductToCart';
import clearProductDetails from "../../redux/actions/clearProductDetails";
import postSelectedCurrency from '../../redux/actions/postSelectedCurrency';
import ProductDetailAttribute from "../../components/product-Detail/product-DetailAttribute";
import ProductDetailPrice from "../../components/product-Detail/product-DetailPrice";
import ProductDetailBrandName from '../../components/product-Detail/product-DetailBrandName';
import ProductDetailAddToCart from '../../components/product-Detail/product-DetailAddToCart';
import ProductDetailDescription from '../../components/product-Detail/product-DetailDescription';
import ProductDetailImageSlide from '../../components/product-Detail/product-DetailImageSlide';
import HeaderDesktop from '../../components/header-Desktop/header-Desktop';
import Blocker from '../../components/blocker/blocker.js';
import './productDetail.css';

class ProductDetail extends Component {

    constructor (props) {
        super(props);
        this.state={};
    }

    onClickImage = (onClick) => {
        this.setState(prevState => ({...prevState, currentImage: onClick.target.src}))
    }

    onClickAddToCart = () => {
        let copyInDeepSelectedProduct = JSON.parse(JSON.stringify(this.props.productDetails))
        let copyInDeepPastProducts = this.props.postedProductsToCart.length!==0
            ? JSON.parse(JSON.stringify(this.props.postedProductsToCart))
            : JSON.parse(localStorage.getItem('cart'))
            ? JSON.parse(localStorage.getItem('cart'))
            : []
        copyInDeepSelectedProduct.attByDefault = Object.values(this.state).slice(0,-1)
        copyInDeepSelectedProduct.idForDeletion = uuidv4()
        copyInDeepSelectedProduct.quantity = 1

        this.props.postProductToCart(copyInDeepPastProducts, copyInDeepSelectedProduct)
    }

    onClickAttribute = (selected) => {
        let stated = []
        for (let i=0; i<this.props.productDetails.attributes.length; i++) {
            stated.push(this.state[i])
        }
        stated.splice(selected.target.id, 1, {id: selected.target.name, value : selected.target.value})
        this.setState((state) => ({...state, ...stated}))
    }

    componentDidMount() {
        if( Object.entries(this.props.productDetails).length === 0 && JSON.parse(sessionStorage.getItem('productDetails'))){
            if (this.props.match.params.id) {
                this.props.getProductById(this.props.match.params.id)
                this.props.postSelectedCurrency(JSON.parse(sessionStorage.getItem('currentCurrency')))
            } else {
                this.props.getProductById(JSON.parse(sessionStorage.getItem('productDetails')).setId)
                this.props.postSelectedCurrency(JSON.parse(sessionStorage.getItem('currentCurrency')))
            }
        }
    }
    componentDidUpdate (prevProps, _prevState) {
        if(this.props.productDetails.setId !== prevProps.productDetails.setId) {
            let attributeStateLoad = []

            for (let i=0; i<this.props.productDetails.attributes.length; i++) {
                attributeStateLoad.push({id: this.props.productDetails.attributes[i].id, value: this.props.productDetails.attributes[i].items[0].value})
            }

            this.setState((state) => ({...state, ...attributeStateLoad}))
            this.setState((state) => ({...state, currentImage: this.props.productDetails.gallery[0]}))
        }
    }

    // componentWillUnmount(){
    //     this.props.clearProductDetails()
    // }

    render () {
        
        if (Object.entries(this.props.productDetails).length === 0 && !JSON.parse(sessionStorage.getItem('productDetails'))) {
            return (
                <div className='productCardLoading'>
                    <h2>Loading...</h2>
                </div>
            )
        }

        let currentProductDetails = []
        if (Object.entries(this.props.productDetails).length !== 0) {
            currentProductDetails = this.props.productDetails
        } else {
            currentProductDetails = JSON.parse(sessionStorage.getItem('productDetails'))
        }

        let currentCurrency = []
        if (this.props.postedCurrentCurrency.length === 0) {
            currentCurrency = [{label: "USD", symbol: "$"}]
        } else {
            currentCurrency = this.props.postedCurrentCurrency
        }

        let currentImage = !this.state.currentImage ? currentProductDetails.gallery[0] : this.state.currentImage

        return (
            <>
            < HeaderDesktop />
            <div className="productDetailContainer">
                < ProductDetailImageSlide gallery={currentProductDetails.gallery} onClickImage={this.onClickImage}/>
                <div className="second">
                    <img src={currentImage} alt="view here" className='imageMain'/>
                    <div className="grouped">
                        < ProductDetailBrandName brand={currentProductDetails.brand} name={this.props.productDetails.name}/>
                        < ProductDetailAttribute attributes={currentProductDetails.attributes} state={this.state} onClickAttribute={this.onClickAttribute}/>
                        < ProductDetailPrice currentCurrency={currentCurrency} prices={currentProductDetails.prices} />
                        
                        { currentProductDetails.inStock
                          ? < ProductDetailAddToCart onClick={this.onClickAddToCart} disabled={false} placeholder={"ADD TOCART"}/>
                          : < ProductDetailAddToCart onClick={this.onClickAddToCart} disabled={true} placeholder={"OUT OF STOCK"}/>
                        }
                        
                        < ProductDetailDescription description={currentProductDetails.description} />
                    </div>
                </div>
                { this.props.blocker ? < Blocker/> : null }
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productDetails: state.productDetails,
        postedCurrentCurrency: state.postedCurrentCurrency,
        postedProductsToCart: state.postedProductsToCart,
        blocker: state.blocker,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearProductDetails: () => dispatch(clearProductDetails()),
        getProductById: (productId) => dispatch(getProductById(productId)),
        postSelectedCurrency: (currentCurrency) => dispatch(postSelectedCurrency(currentCurrency)),
        postProductToCart: (pastSelection, currentSelection) => dispatch(postProductToCart(pastSelection, currentSelection)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)