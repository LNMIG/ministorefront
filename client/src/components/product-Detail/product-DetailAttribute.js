import { Component } from "react";
import { connect } from "react-redux";
import putNewProductAttributes from '../../redux/actions/putNewProductAttributes'
import './product-DetailAttribute.css'
import './product-DetailAttributeMainCart.css'
import './product-DetailAttributeMiniCart.css'

class ProductDetailAttribute extends Component {

    constructor (props) {
        super(props);
        this.state={};
    }
    
    onClickOther = (selected) => {
        let stated = {id: selected.target.name, value: selected.target.value}
        let attByDefault = this.props.state.map(each=> each.id === stated.id ? stated : each)
        this.setState((state) => ({...state, attByDefault}))
    }

    componentDidUpdate (_prevProps, prevState) {
        if(this.state !== prevState) {
            let postedProductsToCart = this.props.postedProductsToCart.length!==0 ? this.props.postedProductsToCart : JSON.parse(localStorage.getItem('cart')) 
            this.props.putNewProductAttributes(postedProductsToCart, this.props.idForDeletion, this.state)
        }
    }

    render () {
        
        if (!this.props.state) return <></>
        if (Object.entries(this.props.state).length === 0) {
            // return <h2>Loading...</h2>
            return <></>
        }

        const returnClassName = (state, itemValue, attributeType) => { 
            if(state) {
                if (attributeType.toLowerCase() === 'text') return Object.values(state)[1].toString() === itemValue ? 'textSelected' : attributeType
                if (attributeType.toLowerCase() === 'swatch') return Object.values(state)[1].toString() === itemValue ? 'swatchSelected' : attributeType
             }
        }
        const returnStyle = (itemValue) => {
            if (itemValue.charAt(0) === '#') return { background: itemValue}
        }
        const returnName = (attributeName) => {
            if (attributeName.charAt(0) !== '#') return attributeName
        }

        return (
            <div className={this.props.whereToShow === 'mainCartPA' ? 'mainCartPA' : this.props.whereToShow === 'miniCartPA' ? 'miniCartPA' : "productDetailAttributeContainer"}>
                {this.props.attributes && this.props.attributes.length>0 ?
                    this.props.attributes.map((attribute, indexA) => {return (
                        <div className="attributeWraper" key={indexA}>
                            <div className="attributeId" >{attribute.name}:</div>
                            <div className="attributeItems">
                                {attribute.items && attribute.items.length > 0 ?
                                    attribute.items.map((item, indexB) => {return (
        
                                        <button
                                            id={indexA}
                                            key={`${item.id}${indexB}`}
                                            className={ returnClassName(this.props.state[indexA], item.value, attribute.type) }
                                            style={ returnStyle(item.value) }
                                            name={attribute.name}
                                            value={item.value}
                                            onClick={this.props.onClickAttribute ? this.props.onClickAttribute : this.onClickOther}
                                        >
                                            {returnName(item.value)}
                                        </button>
        
                                    )})
                                :
                                null
                                }
                            </div>
                        </div>
                    )})
                :
                null
                }
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
        putNewProductAttributes: (pack, id, attribute) => dispatch(putNewProductAttributes(pack, id, attribute))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailAttribute);
