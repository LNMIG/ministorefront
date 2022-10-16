import { Component } from "react"
import { Link } from "react-router-dom"
import './continueShoppingLink.css'

class ContinueShopping extends Component {
    render () {
        let currentCategory = sessionStorage.getItem('postedCurrentCategory')
            ? JSON.parse(sessionStorage.getItem('postedCurrentCategory')).currentCategory
            : "all"

        return (
            <div className="continueShoppingContainer">
                <Link className="continueShopping" to={`/productslist/${currentCategory}`}>Continue shopping </Link>
            </div>
        )
    }
}
export default ContinueShopping
