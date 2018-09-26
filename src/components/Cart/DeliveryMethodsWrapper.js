import React, {Component} from 'react';
import { connect } from 'react-redux';
import DeliveryMethod from './DeliveryMethod_new';
import Preloader from '../Preloader';
import {UnmountClosed} from 'react-collapse';
// import {presets} from 'react-motion';

class DeliveryMethodsWrapper extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showDeliveries: false
        };
        this.toggleDeliveries = this.toggleDeliveries.bind(this);
        this.hideDeliveries = this.hideDeliveries.bind(this);
    };

    toggleDeliveries(){
        this.setState(prevState => ({
            showDeliveries: !prevState.showDeliveries
        }));
    };

    hideDeliveries(){
        this.setState(prevState => ({
            showDeliveries: false
        }));
    };

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.summary) !== JSON.stringify(nextProps.summary)){
            this.hideDeliveries();
        }
    }

    render(){
        var deliveriesFiltered = this.props.deliveryMethods.filter(m => !this.props.config.selfDeliveryMethodIds.includes(m.id));
        var checkSummary = this.props.summary && Object.keys(this.props.summary).length && this.props.summary.delivery;
        var that = this;
        function deliveries(method, i ){
            if(that.props.config.selfDeliveryMethodIds.includes(method.id)){
                return null
            } else {
                return <DeliveryMethod method={method} key={i}/>
            }
        };

        if (this.props.isLoading || this.props.addressesisPatching || this.props.cartIsUpdating) {
            return <Preloader cls="usericon"/>;
        };

        if (this.props.hasErrored ) {
            return (<span>Error!</span>)
        };

        //есть активный способ
        if(checkSummary){
            return (
                <div className="col-12 col-lg-6 deliveryMethodsWrapper">
                    {deliveriesFiltered.length ?
                        <React.Fragment>
                            <div className="r-secction__heading">
                                <span className="r-section__subtitle">Выберите способ доставки</span>
                                {deliveriesFiltered.length > 1 ?
                                    <span className={"r-btn-edit r-btn-edit" + (this.state.showDeliveries ? "--show" : "--hide")} onClick={()=>this.toggleDeliveries()}>{this.state.showDeliveries ? "Отмена" : "Изменить"}</span>
                                    :
                                    null
                                }
                            </div>
                            {deliveries(this.props.summary.delivery)}
                        </React.Fragment>
                        :
                        null
                    }

                    <UnmountClosed isOpened={this.state.showDeliveries} springConfig={{stiffness: 300, damping:30}}>
                        {this.props.deliveryMethods && this.props.deliveryMethods.filter(d => (d.id !== this.props.summary.delivery.id)).map((method, i) => deliveries(method, i))}
                    </UnmountClosed>
                </div>
            );
        //нет активного способа, но есть способы
        } else if(deliveriesFiltered.length > 0){
            return (
                <div className="col-12 col-lg-6">
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Выберите способ доставки</span>
                    </div>
                    {this.props.deliveryMethods && this.props.deliveryMethods.map((method, i) => deliveries(method, i))}
                </div>
            );
        } else {
            return null;
        }
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.deliveryMethodsIsLoading,
        addressesisPatching: state.addressesIsUpdating,
        deliveryMethods: state.deliveryMethods,
        hasErrored: state.deliveryMethodsHasErrored,
        cartIsUpdating: state.cartIsUpdating,
        summary: state.cartSummary,
        config: state.getConfigSuccess
    };
};

export default connect(mapStateToProps, null)(DeliveryMethodsWrapper);
