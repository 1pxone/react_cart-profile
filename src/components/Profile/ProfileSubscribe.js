import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUserSubscription } from '../../actions/user';

class ProfileSubscribe extends Component{
    onChange = (e) => {
        e.preventDefault();
        this.props.updateUserSubscription({"isSubscriber": !this.props.user.isSubscriber})
    };
    render(){
        var u = this.props.user;
        return (
            <section className={"dashBlock " + (this.props.isUpdating ? "isPatching": "")}>
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Подписка на новости</span>
                </div>
                {u.isSubscriber ?
                    <span className="fs-small">Вы подписаны на получение новостей.</span>
                    :
                    <span className="fs-small">В настоящее время вы не подписаны на получение каких-либо новостей.</span>
                }
                <div className="r-input__wrapper">
                    <input type="checkbox" className="r-input__check" name="isActive" onChange={this.onChange} checked={u.isSubscriber ?  'checked' : ''}/>
                    <label className="r-input__label r-input__label--inline">
                        <span>Новостная рассылка</span>
                    </label>
                </div>
            </section>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.userHasErrored,
        isLoading: state.userIsLoading,
        isUpdating: state.userSubscriptionIsUpdating
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserSubscription: (form) => dispatch(updateUserSubscription(form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSubscribe);
