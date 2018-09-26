import React, {Component} from 'react';
import {preOrderFinally} from "../actions/cart_new";
import {connect} from "react-redux";

class Hint extends Component {
    componentDidMount() {
        setTimeout(this.close, 5000)
    }

    close = () => {
        this.props.preOrderFinally(false)
    };

    render() {
        return (
            <div className='preOrder__hint' onClick={this.close}>
                {this.props.message}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        preOrderFinally: (bool) => dispatch(preOrderFinally(bool)),
    }
};

export default connect(null, mapDispatchToProps)(Hint);
