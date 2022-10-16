import { Component } from "react";
import './divider.css'

class Divider extends Component {
    render () {
        return (
            <div className="divider">
                <div className="line"></div>
                <div className="inside">OR</div>
            </div>
        )
    }
}
export default Divider