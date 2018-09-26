import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getConfig } from '../../actions/config';
import { fetchUserData } from '../../actions/user';
import {authDropDownVisibility} from "../../actions/cart_new";
import Preloader from '../Preloader';
import Dropdown from '../Cart/Dropdown';
import Login from './Login';
import Logout from '../AuthNew/Logout';

class UserIcon extends Component {
    componentDidMount(){
        this.props.getConfig();
        this.props.fetchUserData();
    }

    toggleDropdown(){
        this.props.changeDropDownVisibility(!this.props.isDropDownOpen);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuth !== this.props.isAuth) {
            this.props.changeDropDownVisibility(false);
        }
    }

    render(){
        var u = this.props.user;
        if (this.props.configRequest && Object.keys(this.props.config).length === 0) {
            return null;
        }
        if (this.props.isLoading) {
            return <div className="dropdown  profile-icon"><Preloader cls="usericon" /></div>;
        }

        return (
            <Dropdown isOpen={this.props.isDropDownOpen} onClose={()=>this.toggleDropdown()} align="right">
                <React.Fragment>
                    <div className={this.props.config.usericon ? this.props.config.usericon.classname : ''}></div>
                </React.Fragment>
                <React.Fragment>
                    {this.props.isAuth ? (
                        <React.Fragment>
                            <div className="profileDropdown__info">
                                <span className="">{u.firstname} {u.surname}</span>
                            </div>
                            <div className="profileDropdown__nav">
                                {this.props.config.modules.map((module, index)=>(
                                    <a key={index} href={this.props.config.rootPath + module.path} className="">{module.title}</a>
                                ))}
                            </div>
                            <div className="profileDropdown__bottom">
                                <Logout text="Выйти" btnClass="profileDropdown--logout"/>
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className="rdropdown__heading">
                            <Login />
                        </div>
                    )}
                </React.Fragment>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.getConfigSuccess,
        user: state.user,
        isAuth: state.userIsAuth,
        isLoading: state.userIsLoading,
        configRequest: state.getConfigRequest,
        isDropDownOpen: state.authDropDownVisibility
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: () => dispatch(fetchUserData()),
        getConfig: () => dispatch(getConfig()),
        changeDropDownVisibility: (bool) => dispatch(authDropDownVisibility(bool))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);
