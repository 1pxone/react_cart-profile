import React, {Component} from 'react';
import { connect } from 'react-redux';
import { userFastRegisterForm } from '../../actions/user';
// import Preloader from '../Preloader';
import InputMask from 'react-input-mask';

class FastReg extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                firstName:  '',
                surname: '',
                phone:  ''
            },
            phonecode:[
                {
                    mask: "+7 (999) 999-99-99",
                    placeholder: "(___) ___-__-__"
                },
                {
                    mask: "+7 (999) 999-99-99",
                    placeholder: "(___) ___-__-__"
                },
                {
                    mask: "+375 (99) 999-99-99",
                    placeholder: "(__) ___-__-__"
                }
            ],
            current: 0
        }
    };

    onChange = (e) => {
        const form = this.state.form;
        form[e.target.name] = e.target.value
        this.setState({...this.state, form});
        this.props.userFastRegisterForm(form);
    };

    selectPhoneCode = (e) => {
        var current = this.state.current;
        current = e.target.value;
        this.setState({...this.state, current});
    }

    save = (e) => {
        e.preventDefault();
        // var form = this.state.form;
        // console.log(form)
    };

    render(){
        return (
            <form onSubmit={this.save} className="recipient-form row">
                <div className="col-12 col-lg-4 r-input__wrapper">
                    <label className="r-input__label">
                        <span>Имя *</span>
                    </label>
                    <input type="text" className="r-input__text" required name="firstName" autoComplete='given-name' onChange={this.onChange} defaultValue={this.state.form.firstName}/>
                </div>
                <div className="col-12 col-lg-4 r-input__wrapper">
                    <label className="r-input__label">
                        <span>Фамилия *</span>
                    </label>
                    <input type="text" className="r-input__text" required name="surname" autoComplete='family-name' onChange={this.onChange} defaultValue={this.state.form.lastName}/>
                </div>
                <div className="r-input__wrapper col-12 col-lg-4">
                    <label className="r-input__label">
                        <span>Телефон*</span>
                    </label>
                    <div className="r-input-group">
                       <select className="r-input__select r-input__select--group" onChange={this.selectPhoneCode} value={this.state.current}>
                          <option value="0">RU</option>
                          <option value="1">KZ</option>
                          <option value="2">BY</option>
                        </select>
                        <InputMask  mask={this.state.phonecode[this.state.current].mask} className="r-input__text r-input__text--group" type="tel" required name="phone" autoComplete='tel-national' onChange={this.onChange} value={this.state.current === 2 ? this.state.form.phone.slice(3) :  this.state.form.phone.slice(1)} maskChar={" "} />
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userIsLoading: state.userIsLoading,
        recipients: state.recipients,
        recipientsIsLoading: state.recipientsIsLoading,
        recipientsIsUpdating: state.recipientsIsUpdating,
        recipientsIsAdding: state.recipientsIsAdding,
        recipientsAddSuccess: state.recipientsAddSuccess,
        recipientsAddHasErrored: state.recipientsAddHasErrored,
        user: state.user,
        isAuth: state.isAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userFastRegisterForm: (form) => dispatch(userFastRegisterForm(form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FastReg);
