import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitOrder } from '../../actions/orders';
import { fastRegister } from '../../actions/user';


class CartSide extends Component{

    constructor(props) {
        super(props);
        this.state = {
            why: []
        }
    };

    why = () => {
        var summary = this.props.summary;
        var reason = [];

        if(!summary.recipient){
            reason.push("Укажите получателя!");
        }

        if(!summary.address){
            reason.push("Укажите адрес доставки");
        }

        if(!summary.delivery){
            reason.push("Выберите способ доставки!");
        }

        if(!summary.payment){
            reason.push("Выберите способ оплаты!");
        }

        this.setState({why: reason})
    }

    fastWhy = () => {
        var summary = this.props.summary;
        var reason = [];
        var form = this.props.userFastRegisterForm;

        if(!summary.address){
            reason.push("Укажите адрес доставки");
        }

        if(!summary.delivery){
            reason.push("Выберите способ доставки!");
        }

        if(!summary.payment){
            reason.push("Выберите способ оплаты!");
        }

        if(!form.phone){
            reason.push("Укажите телефон получателя!")
        }
        if(!form.firstName){
            reason.push("Укажите имя получателя!")
        }
        if(!form.surname){
            reason.push("Укажите фамилию получателя!")
        }

        this.setState({why: reason})

    }

    register = () =>{
        var form = this.props.userFastRegisterForm;
        this.props.fastRegister(form);
    }

    componentWillReceiveProps(){
        this.setState({why:[]})
    }

    render(){
        var summary = this.props.summary;
        var checkSummary = summary && Object.keys(summary).length && summary.delivery && summary.payment && summary.recipient && summary.address;
        if(this.props.isAuth){
            if(checkSummary){
                return (
                    <div className="process-order__wrapper">
                        <button className={"r-btn-default w-full " + (this.props.isPlacing ? "isPatching" : "")} onClick={()=>this.props.submitOrder(summary.payment.id)}>Оформить заказ</button>
                        <span className="termsandconditions">
                            Нажимая на кнопку, вы принимаете <a href={this.props.config.termsAndConditionsLink} className="r-btn-edit" target="_blank">Условия заказа и покупки товаров</a>
                        </span>
                    </div>
                )
            } else{
                return (
                    <div className="process-order__wrapper">
                        {this.state.why.length ?
                            <div className="process-order--blockers">
                                {this.state.why.map((r,i)=>(
                                    <span key={i}>&times; {r}</span>
                                ))}
                            </div>
                            :
                            null
                        }
                        <button className="r-btn-default w-full r-btn-default--disabled" onClick={this.why}>Оформить заказ</button>
                        <span className="termsandconditions">
                            Нажимая на кнопку, вы принимаете <a href={this.props.config.termsAndConditionsLink} className="r-btn-edit" target="_blank">Условия заказа и покупки товаров</a>
                        </span>
                    </div>
                )
            }
        } else {
            var userForm = this.props.userFastRegisterForm;
            var checkForm = false;
            if(userForm.phone && userForm.firstName && userForm.surname && userForm.phone.length > 3 && summary && Object.keys(summary).length && summary.delivery && summary.payment && summary.address){
                checkForm = true;
            }
            return (
                <div className="process-order__wrapper">
                    {this.state.why.length ?
                        <div className="process-order--blockers">
                            {this.state.why.map((r,i)=>(
                                <span key={i}>&times; {r}</span>
                            ))}
                        </div>
                        :
                        null
                    }
                    {checkForm ?
                        <button className="r-btn-default w-full" onClick={this.register}>Оформить заказ</button>
                        :
                        <button className="r-btn-default w-full r-btn-default--disabled" onClick={this.fastWhy}>Оформить заказ</button>
                    }
                    <span className="termsandconditions">
                        Нажимая на кнопку, вы принимаете <a href={this.props.config.termsAndConditionsLink} className="r-btn-edit" target="_blank">Условия заказа и покупки товаров</a>
                    </span>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isPlacing: state.orderIsPlacing,
        hasErrored: state.ordersHasErrored,
        isAuth: state.userIsAuth,
        cart: state.cartItems,
        summary: state.cartSummary,
        userFastRegisterForm: state.userFastRegisterForm,
        config: state.getConfigSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitOrder: (payment_type) => dispatch(submitOrder(payment_type)),
        fastRegister: (form) => dispatch(fastRegister(form))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartSide));
