import { Component } from "react";
import './productBought.css';


class ProductBought extends Component {
    render () {

        const returnStyle = (attributeValue) => {
            if (attributeValue.charAt(0) === '#') return { background: attributeValue, width:'1rem', height:'0.75rem', marginLeft: '0.25rem' }
        }
        const returnName = (attributeValue) => {
            if (attributeValue.charAt(0) !== '#') return attributeValue
        }
        const returnOneToShow = (attribute, index) => {
            if (attribute.value.charAt(0) !== '#') return <div key={index} className="eachAttr">{`${attribute.id}: ${attribute.value}`}</div>
            return  <div key={index} className="eachInLine">
                        <div className="">{`${attribute.id}: `}</div>
                        <div className="" style={ returnStyle(attribute.value) }>{returnName(attribute.value)}</div>
                    </div>
        }

        return (
            <div className="productBoughtContainer">
                <div className="imageContainer">
                    <img src={this.props.product.gallery[0]} alt="view here" className='imageOne'/>
                    <div className="counter">{this.props.product.quantity}</div>
                </div>

                <div className="titleAttrWrapper">
                    <div className="titleContainer">
                        <div className="brandname">{`${this.props.product.brand} - ${this.props.product.name}`}</div>
                        <div className="price">{`${this.props.product.prices[0].currency.symbol} ${this.props.product.prices[0].amount}`}</div>
                    </div>
                    <div className="attributeContainer">
                        {this.props.product.attributes && this.props.product.attributes.length > 0
                            ? this.props.product.attByDefault.map((attribute,index) => returnOneToShow(attribute, index))
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductBought