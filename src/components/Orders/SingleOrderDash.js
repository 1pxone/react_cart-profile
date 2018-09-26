import React, {Component} from 'react';
import {orderHeading} from '../../utils';
import { connect } from 'react-redux';
import { getPaymentSrc } from '../../actions/orders';
import CartProductMaxi from '../Cart/CartProductMaxi';
import Modal from '../Modal';
import Preloader from '../Preloader';
import { priceFormat, phoneFormat } from '../../utils';
import PaymentMethod from '../Cart/PaymentMethod_order';

class SingleOrderDash extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            isPaymentOpen: false
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalPaymentShow = this.modalPaymentShow.bind(this);
        this.modalPaymentHide = this.modalPaymentHide.bind(this);
    }

    modalShow(){
        this.setState({isOpen: true});
    }

    modalHide(){
        this.setState({isOpen: false});
    }

    modalPaymentShow(){
        this.setState({isPaymentOpen: true});
    }

    modalPaymentHide(){
        this.setState({isPaymentOpen: false});
    }

    pay(id){
        this.props.iframe(id)
        this.modalShow();
    }

    changePayment = (e) => {
        e.preventDefault();
        this.modalPaymentShow();
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.isUpdating && this.state.isPaymentOpen){
            this.modalPaymentHide();
        }
    }

    render(){
        var order = this.props.order;
        const productcount = order.items.reduce( function(cnt,o){ return cnt + o.count*1; }, 0);

        const discount = order.items.filter(product => ('newprice' in product))
        .reduce((memo, product) => {
            if ('newprice' in product && product.price !== product.newprice) {
                return memo += (product.price - product.newprice) * product.count
            } else {
                return null
            }
        }, 0);

        const subtotal = order.items.reduce((memo, product) => {
            if ('newprice' in product && product.price !== product.newprice) {
                memo += product.newprice * product.count
            } else {
                memo += product.price * product.count
            }
            return memo
        }, 0);

        var total = priceFormat(subtotal + (order.summary.delivery && order.summary.delivery.cost ? order.summary.delivery.cost : 0));
        var payNowBtn = <button className="r-btn-default w-full" onClick={()=>this.pay(order.id)}>Оплатить</button>;
        var nullBtn = null;
        function OrderBTN(code){
            switch (code * 1) {
                case 10: return payNowBtn; // new
                case 20: return payNowBtn; // confirmed
                case 100: return nullBtn; // canceled
                case 200: return payNowBtn; // waiting for payment
                case 300: return nullBtn; // payment in progress
                case 400: return nullBtn; // payment authorized
                case 500: return nullBtn; // paid
                default: break;
            }
        };

        return (
            <div className="rcard-wrapper">
                <div className="rcard-inner">
                    <div className="order__head_">
                        <div className="order__bottom">
                            <div className="order__bottom--flex">
                                <span>№: {order.id}</span>
                                <span>Дата: {order.created}</span>
                                <span>Статус: <span className={"order-status__indicator " + (orderHeading(order.status.code))}></span> {order.status.description}</span>
                            </div>
                            {order.summary.recipient ?
                                <div className="order__bottom--flex">
                                    <span>Получатель: {order.summary.recipient.name}{order.summary.recipient.phone ? (", " + phoneFormat(order.summary.recipient.phone)) : ""}</span>
                                </div>
                                : null
                            }
                            {order.summary.address && order.summary.deliveryAddress ?
                                <div className="order__bottom--flex">
                                    <span>Адрес доставки: {order.summary.deliveryAddress.country}, {order.summary.deliveryAddress.city}, {order.summary.address}</span>
                                </div>
                                : null
                            }
                            {order.summary.delivery ?
                                <div className="order__bottom--flex">
                                    <span>Тип доставки: {order.summary.delivery.title}</span>
                                </div>
                                : null
                            }
                            {order.summary.payment ?
                                <div className="order__bottom--flex">
                                    <span>Тип оплаты: {order.summary.payment.title}</span>
                                    {order.summary.availablePayments && order.summary.availablePayments.length
                                        ? <span className="rcard__more" onClick={this.changePayment}>Изменить</span>
                                        : null
                                    }
                                </div>
                                : null
                            }
                            {order.summary.comment ?
                                <div className="order__bottom--flex">
                                    <span>Комментарий к заказу: {order.summary.comment}</span>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
                {order.summary.availablePayments && order.summary.availablePayments.length ?
                    <Modal isOpen={this.state.isPaymentOpen} onClose={()=>this.modalPaymentHide()} heading={"Изменить способ оплаты для заказа №" + order.id}>
                        <section className={this.props.isUpdating ? "isPatching" : ""}>
                            {order.summary.availablePayments.map((method,i)=>(
                                <PaymentMethod method={method} key={i} orderId={order.id}/>
                            ))}
                            <div className="r-input__controls">
                                <button type="button" className={"r-btn-secondary fs-small "} onClick={()=>this.modalPaymentHide()}>Отмена</button>
                            </div>
                        </section>
                    </Modal>
                    : null
                }
                <div className="order__products">
                    {order.items.map(item => (<CartProductMaxi key={item.sku} item={item} link={true}/>))}
                </div>
                <div className="rcard-inner">
                    <div className="order__bottom">
                        <div className="order__bottom--flex"><span>Товары, {productcount} шт.:</span> <span className="order__value">{priceFormat(subtotal)} ₽ </span></div>
                        {discount ? <div className="order__bottom--flex"><span>Скидка:</span> <span className="order__value">{"-" + priceFormat(discount)} ₽</span></div> : null}
                        {order.summary.delivery ? <div className="order__bottom--flex"><span>Доставка:</span> <span className="order__value">{order.summary.delivery.cost > 0 ? (order.summary.delivery.cost + " ₽") : "Бесплатно"}</span></div> : null}
                        <div className="order__bottom--flex"><span>Итого к оплате:</span> <span className="order__head--total">{total} ₽ </span></div>
                        {order.summary.payment && (order.summary.payment.id === "pay_card" || order.summary.payment.id === "qiwi" || order.summary.payment.id === "yandex_money") ? OrderBTN(order.status.code) : null }
                    </div>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={()=>this.modalHide()} heading={"Оплата заказа №" + order.id} isBig={true}>
                    {this.props.isLoading
                        ? <Preloader cls="payment"/>
                        : <iframe width="100%" height="100%" src={this.props.src} frameBorder="0" allowFullScreen title={order.id + "pay"}></iframe>
                    }
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.getConfigSuccess,
        isLoading: state.orderPaymentIsLoading,
        src: state.orderPaymentSrc,
        isUpdating: state.ordersIsUpdating
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        iframe: (orderid) => dispatch(getPaymentSrc(orderid))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrderDash);
