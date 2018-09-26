import React, {Component} from 'react';
import { connect } from 'react-redux';
import SingleOrderDash from './SingleOrderDash';
import AccountWrapper from '../AccountWrapper';
import { getOrders } from '../../actions/orders';
import Preloader from '../Preloader';

class Orders extends Component{
    componentDidMount(){
        this.props.getOrders();
        document.title = "Заказы";
    }
    render(){
        var orders = this.props.orders;
        if(this.props.isLoading){
            return(
                <AccountWrapper>
                    <section className="dashBlock">
                        <div className="r-secction__heading">
                            <span className="r-section__title">Заказы</span>
                        </div>
                    </section>
                    <Preloader cls="dash"/>
                </AccountWrapper>
            )
        }
        return (
            <AccountWrapper>
                <section className="dashBlock">
                    <div className="r-secction__heading">
                        <span className="r-section__title">Заказы</span>
                    </div>
                    {orders.length === 0 ?
                        <span className="fs-small">У вас еще нет заказов</span>
                        :
                        <div className="row">
                            {orders.map((order, i)=>(
                                <div class="col-12 col-lg-9" key={i}>
                                    <SingleOrderDash order={order} />
                                </div>
                            ))}
                        </div>
                    }
                </section>
            </AccountWrapper>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        hasErrored: state.ordersHasErrored,
        isLoading: state.ordersIsLoading,
        isUpdating: state.ordersIsUpdating
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: () => dispatch(getOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
