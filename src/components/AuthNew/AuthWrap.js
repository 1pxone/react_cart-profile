import React, {Component} from 'react';
import { connect } from 'react-redux';
import SocialAuth from './SocialAuth';
import dataLayer from '../../utils/dataLayer';

class AuthWrap extends Component {
    componentDidMount(){
        var onCart;
        if(window.location.pathname.substring(1).split('/')[0] === "cart"){
            onCart = true;
        } else {
            onCart = false
        }
        if(onCart){
            dataLayer(this.props.cartAll, 2)
        }
    }
    render() {



        return (
            <div className={this.props.config.containerClass}>
                <div className="row auth_wrapper">
                    {this.props.children}
                    <div className="col-12 col-lg-6">
                        {/*{onCart && this.props.cart.length ?
                            <React.Fragment>
                                <span className="r-section__title">Продолжить без регистрации</span>
                                <NoAuth />
                                <hr />
                            </React.Fragment>
                            :
                            null
                        }*/}
                        <span className="r-section__title">Войти с помощью социальных сетей</span>
                        <SocialAuth />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        cartAll: state.cartAll,
        config: state.getConfigSuccess
    }
};

export default connect(mapStateToProps, null)(AuthWrap);
