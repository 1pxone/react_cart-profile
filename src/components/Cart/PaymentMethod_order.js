import React, {Component} from 'react';
import { connect } from 'react-redux';
import { changePaymentType } from '../../actions/orders';
import Modal from '../Modal';

class PaymentMethod extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    };

    selectThis(e,id){
        e.preventDefault();
        // this.props.changePaymentType(this.props.orderId, id)
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && !this.state.isOpen) {
            this.props.changePaymentType(this.props.orderId, id)
        }
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    

    render(){
        var {id, title, description, fullDescription, icon} = this.props.method;
        return (

            <React.Fragment>
                <label htmlFor={"payment_"+id} className={"rcard-wrapper rcard__label "} >
                    <div className="rcard-inner">
                        <div className="rcard-content">
                            <span className="rcard__title">
                                {icon ? <img src={icon} className="rcard-content__image" alt=""/> : null}
                                {title}
                            </span>
                            <span className="rcard__decription" dangerouslySetInnerHTML={{__html: description }}/>
                            {fullDescription && fullDescription !== "" ?
                                <span onClick={(e)=>this.toggleModal(e)} className="rcard__more" ref={this.setWrapperRef}>Подробнее об этом способе оплаты</span>
                                :
                                null
                            }
                        </div>
                        <div className="rcard-toggle">
                            <input id={"payment_"+id} name="payment_method" type="radio" onChange={(e) => this.selectThis(e,id)}/>
                            <label htmlFor={"payment_"+id} className="rcard-toggle__label"></label>
                        </div>
                    </div>
                </label>
                {fullDescription && fullDescription !== "" ?
                    <Modal isOpen={this.state.isOpen} onClose={(e)=>this.toggleModal(e)} heading={title}>
                        <div className="rcard-content">
                            <span dangerouslySetInnerHTML={{__html: fullDescription}} />
                        </div>
                    </Modal>
                    :
                    null
                }
            </React.Fragment>

        );
    };
};

const mapStateToProps = (state) => {
    return {
        isPatching: state.paymentMethodsIsUpdating,
        summary: state.cartSummary
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePaymentType: (orderId, paymentId) => dispatch(changePaymentType(orderId, paymentId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
