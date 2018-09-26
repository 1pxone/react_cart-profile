import React, {Component} from 'react';
import { connect } from 'react-redux';
import { recipientsPatch, recipientsDelete, recipientsAdd } from '../../actions/recipients';
import Preloader from '../Preloader';
import InputMask from 'react-input-mask';

class RecipientsForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                isActive:  this.props.recipient ? this.props.recipient.isActive : true,
                firstName:  this.props.recipient ? this.props.recipient.firstName : (this.props.user.firstname ? this.props.user.firstname  : ''),
                lastName: this.props.recipient ? this.props.recipient.lastName : (this.props.user.surname ? this.props.user.surname  : ''),
                phone:  this.props.recipient ? this.props.recipient.phone : ""
            },
            phonecode:[
                {
                    mask: "+9 999 999 99 99"
                },
                {
                    mask: "+9 999 999 99 99"
                },
                {
                    mask: "+999 99 999 99 99"
                }
            ],
            current: "0",
            isOpen: false,
            recipientId: this.props.recipient ? this.props.recipient.id : ""
        }
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    onChange = (e) => {
        const form = this.state.form;
        if(e.target.name === "isActive"){
            form[e.target.name] = !form.isActive
        } else {
            form[e.target.name] = e.target.value
        }
        this.setState({...this.state, form});
    };

    selectPhoneCode = (e) => {
        var current = this.state.current;
        var form = this.state.form;
        current = e.target.value;
        form.phone = "";
        this.setState({...this.state, current, form});
    }

    save(e){
        e.preventDefault();
        var form = this.state.form;
        if(this.props.recipient){
            this.props.recipientsPatch(this.state.recipientId, form);
        } else {
            this.props.recipientsAdd(form);
        };
    };

    deleteAddress(e){
        e.preventDefault();
        this.props.recipientsDelete(this.state.recipientId)
    }

    componentDidMount(){
        if(this.props.recipient){
            if(Object.keys(this.props.recipient).length){
                if(this.props.recipient.phone[0]=== "3"){
                    this.setState({...this.state, current: 2})
                } else if(this.props.recipient.phone[0] === "7"){
                    this.setState({...this.state, current: 0})
                }
            }
        }

    }

    render(){
        if(this.props.userIsLoading || this.props.recipientsIsLoading){
            return <Preloader cls="usericon"/>;
        }
        return this.props.on === "modal" ? (
            <form onSubmit={(e) => this.save(e)} className={"recipient-form " + (this.props.recipientsIsUpdating || this.props.recipientsIsAdding ? "isPatching": "")}>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Имя *</span>
                    </label>
                    <input type="text" className="r-input__text" required name="firstName" autoComplete='given-name' onChange={this.onChange} defaultValue={this.state.form.firstName} />
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Фамилия *</span>
                    </label>
                    <input type="text" className="r-input__text" required name="lastName" autoComplete='family-name' onChange={this.onChange} defaultValue={this.state.form.lastName}/>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Телефон*</span>
                    </label>
                    <div className="r-input-group">
                       <select className="r-input__select r-input__select--group" onChange={this.selectPhoneCode} value={this.state.current}>
                           <option value="0">RU</option>
                           <option value="1">KZ</option>
                           <option value="2">BY</option>
                        </select>
                        <InputMask disabled={this.props.recipientsIsUpdating ? 'disabled':''} mask={this.state.phonecode[this.state.current].mask} className="r-input__text r-input__text--group" type="tel" required name="phone" autoComplete='tel-national' onChange={this.onChange} value={this.state.form.phone} maskChar={null} alwaysShowMask={true} pattern=".{16,}"/>
                    </div>
                </div>
                <div className="r-input__controls">
                    {this.state.recipientId ? <button type="button" className={"r-btn-edit fs-small " + (this.props.recipientsIsUpdating ? "isPatching": "")} onClick={this.props.onClose}>Отмена</button> : null}
                    <button type="submit" className={"r-btn-default " + (this.props.recipientsIsUpdating ? "isPatching": "")}>Сохранить</button>
                </div>
            </form>
        ) : (
            <form onSubmit={(e) => this.save(e)} className={"recipient-form row " + (this.props.recipientsIsUpdating || this.props.recipientsIsAdding ? "isPatching": "")}>
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
                    <input type="text" className="r-input__text" required name="lastName" autoComplete='family-name' onChange={this.onChange} defaultValue={this.state.form.lastName}/>
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
                        <InputMask disabled={this.props.recipientsIsUpdating ? 'disabled':''} mask={this.state.phonecode[this.state.current].mask} className="r-input__text r-input__text--group" type="tel" required name="phone" autoComplete='tel-national' onChange={this.onChange} value={this.state.form.phone} maskChar={null} alwaysShowMask={true} pattern=".{16,}"/>
                    </div>
                </div>
                <div className="r-input__controls col-12">
                    <button type="submit" className={"r-btn-default " + (this.props.recipientsIsUpdating ? "isPatching": "")}>Сохранить</button>
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
        recipientsPatch: (id, data) => dispatch(recipientsPatch(id, data)),
        recipientsDelete: (id) => dispatch(recipientsDelete(id)),
        recipientsAdd: (data) => dispatch(recipientsAdd(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipientsForm);
