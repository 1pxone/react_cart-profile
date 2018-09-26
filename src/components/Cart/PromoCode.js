import React, {Component} from 'react';
import {connect} from "react-redux";
import {submitPromo} from "../../actions/cart_new";

class PromoCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promo: this.props.promo || '',
            email: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitPromo(this.state.promo, this.state.email)
    }

    handleChange = (event) => {
        var promo = event.target.value;
        this.setState({...this.state, promo});
    }

    handleChangeEmail = (event) => {
        var email = event.target.value;
        this.setState({...this.state, email});
    }

    componentDidUpdate(prevProps){
        if(this.props.hasFailed !== prevProps.hasFailed){
            var email = '';
            this.setState({...this.state, email})
        }
    }

    render() {
        return (
            <div>
                <form className="form-promo" onSubmit={this.handleSubmit}>
                    <div className="r-input-group">
                        <input type="text" className="r-input__text r-input__text--group" required placeholder="Ваш промокод" value={this.state.promo} onChange={this.handleChange} disabled={this.props.isLoading ? 'disabled' : ''}/>
                        <button className={"r-btn-default " + (this.props.isLoading ? 'isPatching' : '')} type="submit" disabled={this.props.isLoading ? 'disabled' : ''}><i className="icon-confirm"></i></button>
                    </div>
                    {this.props.hasFailed && !this.props.isLoading ? <span className="form-promo__errors">Промокод не действителен</span> : null}
                {this.props.needAuth && !this.props.isAuth ?
                    <div>
                        <span className="fs-small promo__needAuth">Если промокод персональный, укажите, пожалуйста, Ваш E-mail:</span>
                        <div className="r-input-group">
                            <input type="email" className="r-input__text r-input__text--group" required placeholder="E-mail" value={this.state.email} onChange={this.handleChangeEmail} disabled={this.props.isLoading ? 'disabled' : ''}/>
                            <button className={"r-btn-default " + (this.props.isLoading ? 'isPatching' : '')} type="submit" disabled={this.props.isLoading ? 'disabled' : ''}><i className="icon-confirm"></i></button>
                        </div>
                    </div>
                : null }
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hasErrored: state.promoHasErrored,
        needAuth: state.promoNeedAuth,
        isLoading: state.promoIsLoading,
        hasFailed: state.promoHasFailed,
        promo: state.promo,
        isAuth: state.userIsAuth

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitPromo: (promo, email) => dispatch(submitPromo(promo, email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromoCode);
