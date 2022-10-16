import { Component } from 'react';
import { connect } from 'react-redux';
import NameShower from '../cartComponents/nameShower';
import ProductsShower from '../cartComponents/productsShower';
import PriceShower from '../cartComponents/priceShower';
import OrderButton from '../cartComponents/generalUseButton';
import './cartMain.css'

class MainCart extends Component {

    render (){

        let saved = this.props.postedProductsToCart.length!==0 ? this.props.postedProductsToCart : JSON.parse(localStorage.getItem('cart'))
        let currentCurrency = this.props.postedCurrentCurrency.length!==0 ? this.props.postedCurrentCurrency: JSON.parse(sessionStorage.getItem('currentCurrency'))

        return (
            <>
                <NameShower />
                {saved && saved.length > 0
                ? saved.map((product, index) => <ProductsShower
                    key={index}
                    class={'mainCartWrapper'}
                    product={product}
                    currentCurrency={currentCurrency}
                    whereToShow={'mainCart'}
                    />)
                :
                <div className={'mainCartWrapper'}>
                    <span className='emptyBag'>Nothing in your bag yet!</span>
                </div>
                }
                <PriceShower products={saved} currentCurrency={currentCurrency} typo={'mainCart'}/>
                <OrderButton classLink={'classLink'} navlink={'checkout'} class={'order'} placeholder={'ORDER'}/>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        postedProductsToCart: state.postedProductsToCart,
        postedCurrentCurrency: state.postedCurrentCurrency,
    };
}
export default connect(mapStateToProps, null)(MainCart);