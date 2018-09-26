import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader';

class OrderSuccess extends Component {
    componentDidMount(){
        document.title = "Спасибо за покупку!";
    }
    render() {
        return (this.props.orderId === '' ?
            <Redirect to="/cart/purchase" />
            :
            <div className={this.props.config.containerClass}>
                <div className="row">
                    <div className="col-12">
                        <span className="r-section__title">Cпасибо за покупку!</span>
                        <span className="order__success">Ваш заказ № <span className="order__success--id">{this.props.orderId}</span> принят в обработку, оператор свяжется с Вами в ближайшее время!</span>
                        {this.props.paymentIsLoaing ?
                            <Preloader cls="main"/>
                            :
                            this.props.paymentSrc ?
                                <div>
                                    <span className="order__success">Оплатите ваш заказ:</span>
                                    <div>
                                        <a className="r-btn-edit" href={this.props.paymentSrc} target="_blank">Постоянная ссылка на оплату Вашего заказа</a>
                                    </div>
                                    <iframe src={this.props.paymentSrc} className="payment__iframe" title="Pay by card">
                                        Ваш браузер не поддерживает плавающие фреймы!
                                    </iframe>
                                </div>
                            :
                                null
                        }
                        <div className="toHome__wrapper">
                            <a href="/" className="r-btn-default">Вернуться в магазин</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.getConfigSuccess,
        paymentIsLoaing: state.orderPaymentIsLoading,
        orderId: state.orderId,
        paymentSrc: state.orderPaymentSrc
    }
};

export default withRouter(connect(mapStateToProps, null)(OrderSuccess));
