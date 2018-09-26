import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUserData } from '../../actions/user';
import InputMask from 'react-input-mask';

class ProfileEdit extends Component{
    constructor(props) {
      super(props);
      this.state = {
          form:{
              "firstname": props.user.firstname ? props.user.firstname : "",
              "surname": props.user.surname ? props.user.surname : "",
              "birthday": props.user.birthday ? props.user.birthday : "",
              "gender": props.user.gender ? props.user.gender : "",
              "phone": props.user.phone ? props.user.phone : ""
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
          current: 0
       }
       this.formatDate = this.formatDate.bind(this);
    }

    onChange = (e) => {
        const form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({...this.state, form});
    }

    selectPhoneCode = (e) => {
        var current = this.state.current;
        current = e.target.value;
        this.setState({...this.state, current});
    }

    updateUser = (e) =>{
        e.preventDefault();
        const form = this.state.form;
        form.birthday = this.formatDate(form.birthday);
        this.props.updateUserData(form);
    }

    formatDate(date){
        if(date){
            if(date.split(".").length === 3){
                var [day, month, year] = date.split(".");
                return `${year}-${month}-${day}`
            } else {
                return date
            }
        }
    }

    render(){
        var errorblock = this.props.errors.map((error,index) => (
            <p><small className="text-danger" key={index}><span aria-hidden="true">&times;</span> {error}</small></p>
        ));

        return(
            <form onSubmit={this.updateUser} className={"changePass-form " + (this.props.isPatching ? "isPatching": "")}>
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Редактировать данные учетной записи</span>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Имя *</span>
                            </label>
                            <input type="text" className="r-input__text" autoComplete="given-name" required name="firstname" onChange={this.onChange} defaultValue={this.state.form.firstname} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Фамилия *</span>
                            </label>
                            <input type="text" className="r-input__text" autoComplete="family-name" required name="surname" onChange={this.onChange} defaultValue={this.state.form.surname} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Дата рождения *</span>
                            </label>
                            <input type="date" className="r-input__text" name="birthday" onChange={this.onChange} defaultValue={this.formatDate(this.state.form.birthday)} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Пол *</span>
                            </label>
                            <select className="r-input__select" name="gender" onChange={this.onChange} defaultValue={this.state.form.gender}>
                                <option value="" disabled>Не указан</option>
                                <option value="Male">Мужской</option>
                                <option value="Female">Женский</option>
                             </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Телефон *</span>
                            </label>
                            <div className="r-input-group">
                                <select className="r-input__select r-input__select--group" onChange={this.selectPhoneCode} value={this.state.current}>
                                    <option value="0">RU</option>
                                    <option value="1">KZ</option>
                                    <option value="2">BY</option>
                                 </select>
                                 <InputMask disabled={this.props.registerRequest ? 'disabled':''} mask={this.state.phonecode[this.state.current].mask} className="r-input__text r-input__text--group" type="tel" required name="phone" autoComplete='tel-national' onChange={this.onChange} value={this.state.form.phone} maskChar={null} alwaysShowMask={true} pattern=".{16,}"/>
                            </div>
                        </div>
                    </div>
                </div>
                {errorblock}
                <div className="r-input__controls">
                    {this.props.on === "modal" && !this.state.addressId ? <button type="button" className={"r-btn-secondary fs-small "} onClick={this.props.onClose}>Отмена</button> : null}
                    <button type="submit" className={"r-btn-default " + (this.props.isPatching ? "isPatching": "")}>Сохранить</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        errors: state.userUpdateErrors,
        isPatching: state.userIsUpdating,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (form) => dispatch(updateUserData(form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
