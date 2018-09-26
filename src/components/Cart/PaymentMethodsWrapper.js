import React, {Component} from 'react';
import { connect } from 'react-redux';
import Preloader from '../Preloader';
import { fetchPaymentMethods} from '../../actions/cart_new';
import PaymentMethod from './PaymentMethod_new';
import {UnmountClosed} from 'react-collapse';
// import {presets} from 'react-motion';

class PaymentMethodsWrapper extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showPayments: false
        };
        this.togglePayments = this.togglePayments.bind(this);
        this.hidePayments = this.hidePayments.bind(this);
    };

    togglePayments(){
        this.setState(prevState => ({
            showPayments: !prevState.showPayments
        }));
    };

    hidePayments(){
        this.setState(prevState => ({
            showPayments: false
        }));
    };

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.summary) !== JSON.stringify(nextProps.summary)){
            this.hidePayments();
        }
    }
    componentDidMount(){
        this.props.fetchPaymentMethods()
    };

    render(){
        var checkSummary = this.props.summary && Object.keys(this.props.summary).length && this.props.summary.payment;
        var show = true;
        if(this.props.deliveryType === "delivery"){
            if(this.props.summary.address && !("externalId" in this.props.summary.address)){
                show = true;
            } else {
                show = false;
            }
        };
        if(this.props.deliveryType === "selfdelivery"){
            if(this.props.summary.address && "externalId" in this.props.summary.address){
                show = true;
            } else {
                show = false;
            }
        };

        if (this.props.deliveryisPatching || this.props.deliveryisLoading || this.props.addressesisLoading || this.props.addressesisPatching || !show) {
            return (
                <div className="r-section payment-section row">
                    <div className="col-12">
                        <span className="r-section__title r-section__title--disabled">2. Оплата</span>
                    </div>
                </div>
            )
        }
        if (this.props.isLoading) {
            return (
                <div className="r-section payment-section row">
                    <div className="col-12">
                        <span className="r-section__title r-section__title--disabled">2. Оплата</span>
                    </div>
                    <Preloader cls="usericon"/>
                </div>
            )
        };

        if (this.props.hasErrored) {
            return (
                <div className="r-section payment-section row">
                    <div className="col-12">
                        <span className="r-section__title r-section__title--disabled">2. Оплата</span>
                    </div>
                    <span>Произошла ошибка!</span>
                </div>
            )
        };
        if(checkSummary){
            return (
                <div className="r-section payment-section row">
                    <div className="col-12">
                        <span className="r-section__title">2. Оплата</span>
                        <div className="r-secction__heading">
                            <span className="r-section__subtitle">Выберите способ оплаты</span>
                            {this.props.paymentMethods.length  > 1 ?
                                <span className={"r-btn-edit r-btn-edit" + (this.state.showPayments ? "--show" : "--hide")} onClick={()=>this.togglePayments()}>{this.state.showPayments ? "Отмена" : "Изменить"}</span>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="col-12 col-lg-12">
                        <PaymentMethod method={this.props.summary.payment} />
                        <UnmountClosed isOpened={this.state.showPayments} springConfig={{stiffness: 300, damping:30}}>
                            {this.props.paymentMethods && this.props.paymentMethods.filter(p => (p.id !== this.props.summary.payment.id)).map((method, i) =>
                                <PaymentMethod method={method} key={i}/>
                            )}
                        </UnmountClosed>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="r-section payment-section row">
                    <div className="col-12">
                        <span className={"r-section__title " + (this.props.paymentMethods.length ? "" : "r-section__title--disabled")}>2. Оплата</span>
                        {this.props.paymentMethods.length ?
                            <div className="r-secction__heading">
                                <span className="r-section__subtitle">Выберите способ оплаты</span>
                            </div>
                            :
                            null
                        }
                    </div>
                    {this.props.paymentMethods.map((method, i) => (
                        <div className="col-12 col-lg-12" key={i}>
                            <PaymentMethod method={method} />
                        </div>
                    ))}
                </div>
            );
        }
    };
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.paymentMethodsIsLoading,
        deliveryType: state.deliveryType,
        summary: state.cartSummary,
        hasErrored: state.paymentMethodsHasErrored,
        paymentMethods: state.paymentMethods,
        deliveryisLoading: state.deliveryMethodsIsLoading,
        deliveryisPatching: state.deliveryMethodsIsUpdating,
        addressesisLoading: state.addressesIsLoading,
        addressesisPatching: state.addressesIsUpdating,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPaymentMethods: () => dispatch(fetchPaymentMethods())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsWrapper);
