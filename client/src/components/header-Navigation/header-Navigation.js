import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllCategories from '../../redux/actions/getAllCategories.js';
import getProductsByCategory from '../../redux/actions/getProductsByCategory.js';
import postCurrentCategory from '../../redux/actions/postCurrentCategory.js';
import NavigationButton from './header-NavButton.js';
import './header-Navigation.css';

export class HeaderNavigation extends Component {

    constructor (props) {
        super(props);
        this.state ={
            buttonSelected:
                JSON.parse(sessionStorage.getItem('navButSelected'))
                ? JSON.parse(sessionStorage.getItem('navButSelected'))
                : '1',
            categorySelected: '',
        }
    }

    onClickButton = (buttonSelected) => {
        this.setState(prevState => ({...prevState, categorySelected: buttonSelected.target.name }))
        this.setState(prevState => ({...prevState, buttonSelected: buttonSelected.target.id }))
        this.props.postCurrentCategory(buttonSelected.target.name)
        
        sessionStorage.setItem('navButSelected', JSON.stringify(buttonSelected.target.id))
    }

    componentDidMount() {
        this.props.getAllCategories();
        this.props.getProductsByCategory(
            JSON.parse(sessionStorage.getItem('postedCurrentCategory'))?.currentCategory
            || "all" //this.state.categorySelected
            );
        if (!this.state.categorySelected
            && !JSON.parse(sessionStorage.getItem('postedCurrentCategory'))
            ) this.props.postCurrentCategory('all')
    }

    componentDidUpdate(_prevProps,prevState) { 
        if (this.state.buttonSelected !== prevState.buttonSelected) {
            this.props.getProductsByCategory(this.state.categorySelected);
            this.props.postCurrentCategory(this.state.categorySelected);
        }
    }

    render() {

        let buttonSelected = this.state.buttonSelected
        const categories = this.props.allCategories

        return (
            <div className='headerNavigationContainer'>

                {categories && categories.length > 0
                ? categories.map((category,index) => 
                    <NavigationButton
                        key={index}
                        id={index + 1}
                        name={category.name}
                        buttonSelected={buttonSelected}
                        onClick={this.onClickButton}
                    />
                )
                : <div>Loading...</div>
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allCategories: state.allCategories,
        postedCurrentCategory: state.postedCurrentCategory,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        getProductsByCategory: (categorySelected) => dispatch(getProductsByCategory(categorySelected)),
        postCurrentCategory: (selectedCategory) => dispatch(postCurrentCategory(selectedCategory)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavigation);