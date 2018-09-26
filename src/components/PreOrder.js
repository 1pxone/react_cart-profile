import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preOrder} from '../actions/cart_new';
import Hint from './Hint';

class PreOrder extends Component {
    componentDidMount() {
        if (this.props.sku) {
        } else {
            console.warn("No 'data-sku' passed to this button's attributes");
        }
    }

    message = (status) => {
        switch (status) {
            case 200: return 'Вы успешно подписанны на уведомления о поступлении.';
            case 204: return 'Вы уже подписаны на данный товар';
            case 500: return 'Не удалось подписаться';
            case 401: return 'Для получения уведомлений необходимо войти на сайт или зарегистрироваться';
            case 404: return 'Товар не найден';
            default: return '';
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className='preOrder__wrapper'>
                    {this.props.finally ? <Hint message={this.message(this.props.status)}/> : null}
                    <button className={`preOrder__btn r-btn-default ${this.props.progress ? "isPatching" : ""}`} onClick={() => this.props.preOrder(this.props.sku)}>
                        <span>Сообщить о поступлении</span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.preOrderStatus,
        progress: state.preOrdering,
        finally: state.preOrderFinally,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        preOrder: (sku) => dispatch(preOrder(sku))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreOrder);
