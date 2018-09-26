import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartProductMaxi from './CartProductMaxi';
import { priceFormat, declension, nds } from '../../utils';
import { orderComment } from '../../actions/orders';
import OrderButton from './OrderButton';
import PromoCode from './PromoCode';

class FinalBlock extends Component{

    constructor(props) {
        super(props);
        this.state = {
             transform: 0
        }
    };

    comment = (e) => {
        var text = e.target.value;
        this.props.orderComment(text);
    }

    render(){
        // const subtotal = this.props.cart.reduce( function(cnt,o){ return cnt + o.price * o.count; }, 0);
        const productcount = this.props.cart.reduce( function(cnt,o){ return cnt + o.count*1; }, 0);
        const subtotal = this.props.cart.reduce((memo, product) => {
            return memo + product.price * product.count;
        }, 0);

        const discount = this.props.cart.filter(product => ('newprice' in product)).reduce((memo, product) => {
            if ('newprice' in product && product.price !== product.newprice) {
                return memo += (product.price - product.newprice) * product.count
            } else {
                return null
            }
        }, 0);

        if (this.props.configRequest) {
            return null;
        };

        return (
            <div className="row r-section finalBlock__wrapper">
                <div className="col-12">
                    <div className="finalBlock__delimeter"></div>
                </div>
                <div className="col-12">
                    <div className="finalBlock__products">
                        <div className="finalBlock__heading">
                            <span className="finalBlock__products--count">В заказе {productcount} {declension(productcount)}</span>
                        </div>
                        <div className="finalBlock__productsWrapper">
                            {this.props.cart.map(item => (
                                <CartProductMaxi key={item.sku} item={item}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6 finalBlock__comment">
                    <div className="r-input__wrapper">
                        <label className="r-input__label">
                            <span>Коментарий к заказу</span>
                        </label>
                        <textarea className="r-input__area" name="additionalInfo" onChange={this.comment}/>
                    </div>
                </div>
                <div className="col-12 finalblock__promo">
                    <PromoCode />
                </div>
                <div className="col-12 col-lg-6 finalBlock__summary">
                    <span className="cart-side__subtotal"><span>Товары:</span> <span className="cart-side__subtotal--amount">{priceFormat(subtotal)} ₽ </span></span>
                    {discount ? <span className="cart-side__discount"><span>Скидка:</span> <span className="cart-side__discount--amount">{"-" + priceFormat(discount)} ₽</span></span> : null}
                    {this.props.summary.delivery ? <span className="cart-side__delivery"><span>Доставка:</span> <span className="cart-side__delivery--amount">{this.props.summary.delivery.cost > 0 ? (this.props.summary.delivery.cost + " ₽") : "Бесплатно"}</span></span> : null}
                    <span className="cart-side__total"><span>Итого к оплате{nds(this.props.summary)}:</span> <span className="cart-side__total--amount">{priceFormat(this.props.summary.order.total)} ₽ </span></span>
                    <OrderButton />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        summary: state.cartSummary
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        orderComment: (text) => dispatch(orderComment(text))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FinalBlock));
