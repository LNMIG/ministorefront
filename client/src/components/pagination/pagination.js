import { Component } from "react";
import { connect } from "react-redux";
import postPaginationData from '../../redux/actions/postPaginationData'
import './pagination.css'

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter:  0,
            currentpage: 1,
            itemsPerPage: 6,
            numberOfPages: 0,
            localProductsByCategory: [],
            previous: false,
            next: false,
        }
    }

    onSlice = (iPP,cP,lPBC) => {
        let sliceStart = iPP * (cP - 1)
        let sliceEnd   = iPP * cP
        let postData = lPBC.slice(sliceStart, sliceEnd)
        this.props.postPaginationData(postData)
    }

    onClick = (selected) => {
        if(selected.target.name === 'next') this.setState(state => ({...state, currentpage: this.state.currentpage + 1}))
        if(selected.target.name === 'prev') this.setState(state => ({...state, currentpage: this.state.currentpage - 1}))
    }

    componentDidMount() {
        let currentCategory = sessionStorage.getItem('postedCurrentCategory')
            ? JSON.parse(sessionStorage.getItem('postedCurrentCategory')).currentCategory
            : 'all'
        
            if(!JSON.parse(sessionStorage.getItem('currentPage'))) {
                sessionStorage.setItem('currentPage', JSON.stringify({page: 1, category: currentCategory}))
            }
    }

    componentDidUpdate (prevProps, prevState) {
        let currentCategory = sessionStorage.getItem('postedCurrentCategory')
            ? JSON.parse(sessionStorage.getItem('postedCurrentCategory')).currentCategory
            : 'all'
        let savedCategory = sessionStorage.getItem('currentPage')
            ? JSON.parse(sessionStorage.getItem('currentPage')).category
            : 'all'
        let setToBasic = false

        if (this.props.postedCurrentCategory !== prevProps.postedCurrentCategory) {
            sessionStorage.setItem('currentPage', JSON.stringify({page: 1, category: currentCategory}))
        } 
        if (currentCategory !== savedCategory) setToBasic = true

        if (this.props.productsByCategory !== prevProps.productsByCategory) {
            let existNPage = JSON.parse(sessionStorage.getItem('currentPage'))
            let existPState = JSON.parse(sessionStorage.getItem('currentPageState'))
            this.setState(state => ({...state,  
                counter: this.state.counter + 1,
                currentpage: existNPage && setToBasic ? 1 : existNPage.page,
                numberOfPages: 0,
                localProductsByCategory: this.props.productsByCategory,
                previous: existPState ? existPState.previous : false,
                next: existPState ? existPState.next : false,
            }))
            this.setState(state => ({...state,
                numberOfPages: Math.ceil(this.props.productsByCategory.length / this.state.itemsPerPage)
            }))
        }

        if (this.state.counter !== prevState.counter) {
            this.onSlice(this.state.itemsPerPage, this.state.currentpage, this.state.localProductsByCategory)
            if (this.state.currentpage !== this.state.numberOfPages) this.setState(state=> ({...state, next: true}))
            if (this.state.currentpage === this.state.numberOfPages) this.setState(state=> ({...state, next: false}))
            if (this.state.currentpage === 1 ) this.setState(state=> ({...state, previous: false}))
        }

        if (this.state.currentpage !== prevState.currentpage && this.state.counter === prevState.counter) {
            if(this.state.currentpage === 1) {
                this.setState(state => ({...state, previous: false, next: true}))
                sessionStorage.setItem('currentPageState', JSON.stringify({previous: false, next: true}))
            }
            if(this.state.currentpage === this.state.numberOfPages) {
                this.setState(state => ({...state, previous: true, next: false }))
                sessionStorage.setItem('currentPageState', JSON.stringify({previous: true, next: false}))
            }
            this.onSlice(this.state.itemsPerPage, this.state.currentpage, this.state.localProductsByCategory)
            sessionStorage.setItem('currentPage', JSON.stringify({page: this.state.currentpage, category: currentCategory}))
        }
    }

    componentWillUnmount () {
        this.setState(state => ({...state, counter: 0}))
    }

    render () {
        return (
            <div className="pagination_wrapper">
                <button
                    name='prev'
                    className={this.state.previous ? "clickEnable" : "clickDisable"}
                    disabled={!this.state.previous}
                    onClick={this.onClick}
                >
                    {'<'}
                </button>
                <div className="page">
                    {`${this.state.currentpage}/${this.state.numberOfPages}`}
                </div>
                <button
                    name='next'
                    className={this.state.next ? "clickEnable" : "clickDisable"}
                    disabled={!this.state.next}
                    onClick={this.onClick}
                >
                    {'>'}
                </button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      productsByCategory: state.productsByCategory,
      postedCurrentCategory: state.postedCurrentCategory,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      postPaginationData: (paginationData) => dispatch(postPaginationData(paginationData)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pagination);