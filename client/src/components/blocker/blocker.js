import { Component } from "react";

class Blocker extends  Component {

    componentDidMount() {
        document.getElementsByTagName('body')[0].classList.add("overflowHidden")
    }
    componentWillUnmount(){
        document.getElementsByTagName('body')[0].classList.remove("overflowHidden")
    }

    render (){
        return (
            <>
            <div className="blocker"></div>
            </>
        )
    }
}
export default Blocker