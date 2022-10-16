import { Component } from "react";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser'
import './product-DetailDescription.css'

class ProductDetailDescription extends Component {

    render () {
        const description = DOMPurify.sanitize(this.props.description, { USE_PROFILES: { html: true } })
        const reactElement = parse(description)
        return (
            // <div className='description' dangerouslySetInnerHTML={{ __html: this.props.description }} />
            <div className="description">
                {reactElement}
            </div> 
        )
    }
}

export default ProductDetailDescription