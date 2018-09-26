import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleOrderDash from './SingleOrderDash';
import { getOrders } from '../../actions/orders';
import Preloader from '../Preloader';

class OrderDash extends Component{
    componentDidMount(){
        this.props.getOrders();
    }
    render(){
        var orders = this.props.orders;
        if(this.props.isLoading){
            return(
                <section className="dashBlock col-12 col-lg-6">
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Заказы</span>
                    </div>
                    <Preloader cls="dash"/>
                </section>
            )
        }
        return (
            <section className="dashBlock col-12 col-lg-6">
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Заказы</span>
                    {orders.length > 1 ?
                        <Link to="/account/orders" className="r-btn-edit">Все заказы ></Link>
                        :
                        null
                    }
                </div>
                {orders.length === 0 ?
                    <span className="fs-small">У вас еще нет заказов</span>
                    :
                    <SingleOrderDash order={orders[0]} />
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        hasErrored: state.ordersHasErrored,
        isLoading: state.ordersIsLoading,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: () => dispatch(getOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDash);
