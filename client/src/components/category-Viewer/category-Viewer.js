import React, { Component } from 'react';
import { connect } from 'react-redux';
import './category-Viewer.css';

class CategoryViewer extends Component {

    constructor (props) {
        super(props)
        this.state = {
            currentCategory: '',
        }
    }

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem('postedCurrentCategory'))){
          this.setState(prevState => ({...prevState,
            currentCategory: JSON.parse(sessionStorage.getItem('postedCurrentCategory')).currentCategory}))
        }
    }

    componentDidUpdate(prevProps, _prevState) {
        if(this.props.postedCurrentCategory !== prevProps.postedCurrentCategory) {
          this.setState(prevState => ({...prevState,
            currentCategory: this.props.postedCurrentCategory.currentCategory}));
        }
    }

    render () {
      return <div className='currentCategoryViewer'>Showing "{this.state.currentCategory}"</div>
    };
}

const mapStateToProps = (state) => {
  return {
    postedCurrentCategory: state.postedCurrentCategory,
  }
}
export default connect(mapStateToProps, null)(CategoryViewer);