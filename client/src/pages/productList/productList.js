import { connect } from 'react-redux';
import React, { Component } from 'react';
import CategoryViewer from '../../components/category-Viewer/category-Viewer';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-Card/product-Card';
import Blocker from '../../components/blocker/blocker.js';
import HeaderDesktop from '../../components/header-Desktop/header-Desktop';
import './productList.css'

export class ProductsList extends Component {
    
    render() {
        return (
            <div className='productListWrapper'>
            < HeaderDesktop />
            <div className="mainContainer">
                <CategoryViewer />
                <Pagination />
                <div className='productsContainer'>
                    <ProductCard />
                </div>
                { this.props.blocker ? < Blocker/> : null }
            </div>
            </div>
        );
    };
};
const mapStateToProps = (state) => {
    return {
        blocker: state.blocker,
    }
}
export default connect(mapStateToProps, null)(ProductsList)