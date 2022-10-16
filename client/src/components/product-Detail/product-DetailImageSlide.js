import { Component } from "react";
import './product-DetailImageSlide.css'

class ProductDetailImageSlide extends Component {

    render () {
        return (
            <div className="first">
                {this.props.gallery.map((image, index) => {return (
                    <button className="button" key={index} onClick={this.props.onClickImage}>
                        <img src={image} alt="view here" className='imageSide' />
                    </button>
                )})}
            </div>
        )
    }
}
export default ProductDetailImageSlide