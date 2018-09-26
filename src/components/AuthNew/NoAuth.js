import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NoAuth extends Component {
    render(){
        return (
            <React.Fragment>
                <span className="fs-small">Получите преимущества зарегистрированного клиента после оформления заказа</span>
                <Link to="/cart/purchase" className="r-btn-default">Продолжить без регистрации</Link>
            </React.Fragment>
        );
    }
}

export default connect(null, null)(NoAuth);
