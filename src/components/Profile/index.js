import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions/user';
import AccountWrapper from '../AccountWrapper';
// import { phoneFormat, genderFormat } from '../../utils/';
import ProfileChangePass from './ProfileChangePass';
import ProfileEdit from './ProfileEdit';
import ProfileSubscribe from './ProfileSubscribe';
// import Modal from '../Modal';
import Logout from '../AuthNew/Logout';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isPassOpen: false,
            isEditOpen: false
        };
        this.togglePassModal = this.togglePassModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    };

    togglePassModal(){
        this.setState(prevState => ({
            isPassOpen: !prevState.isPassOpen
        }))
    };

    componentDidMount(){
        document.title = "Профиль";
    }

    toggleModal(){
        this.setState(prevState => ({
            isEditOpen: !prevState.isEditOpen
        }))
    };

    componentWillReceiveProps(nextProps){
        if(!nextProps.isPassUpdating && this.state.isPassOpen && !nextProps.passChangeErrors.length){
            this.togglePassModal()
        }
        if(!nextProps.isUserUpdating && this.state.isEditOpen){
            this.toggleModal()
        }
    }

    render(){
        // var u= this.props.user;
        if (this.props.hasErrored) {
            return (<p>Error!</p>);
        }

        if (this.props.isLoading) {
            return (<p>Loading…</p>);
        }
        return(
            <AccountWrapper>
                <section>
                    <div className="r-secction__heading">
                        <span className="r-section__title">Профиль</span>
                    </div>
                    <ProfileEdit onClose={()=>this.toggleModal()}/>
                    <hr />
                    <ProfileChangePass onClose={()=>this.togglePassModal()}/>
                    <hr />
                    <ProfileSubscribe />
                    <hr />
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Выйти из учетной записи</span>
                    </div>
                    <div className="profile__nav--bottom">
                        <Logout text="Выход" btnClass="profile__nav--logout"/>
                    </div>
                </section>
            </AccountWrapper>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isPassUpdating: state.userChangePassRequest,
        passChangeErrors: state.userChangePassErrors,
        isUserUpdating: state.userIsUpdating,
        isLoading: state.userIsLoading,
        hasErrored: state.userHasErrored,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: (url) => dispatch(fetchUserData(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
