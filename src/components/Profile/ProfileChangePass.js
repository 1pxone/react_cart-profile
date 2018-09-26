import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUserPass } from '../../actions/user';

class ProfileChangePass extends Component{
    constructor(props) {
      super(props);
      this.state = {
          form:{
              "current_password":"",
              "plainPassword[first]":"",
              "plainPassword[second]":""
          },
          normalized: {
              "current_password":"",
              "plainPassword":{
                  "first":"",
                  "second":""
              }
          }
       }
    }

    onChange = (e) => {
        const form = this.state.form;
        form[e.target.name] = e.target.value;
        var normalized = {
            "current_password":this.state.form.current_password,
            "plainPassword":{
                "first":this.state.form["plainPassword[first]"],
                "second":this.state.form["plainPassword[second]"]
            }
        };
        this.setState({...this.state, form, normalized});
    }

    updateUserPass = (e, data) => {
        e.preventDefault();
        this.props.updateUserPass(data);
    }

    render(){
        var errorblock = this.props.errors.map((error,index) => (
            <p><small className="text-danger" key={index}><span aria-hidden="true">&times;</span> {error}</small></p>
        ));

        return(
            <form onSubmit={(e)=>this.updateUserPass(e, this.state.normalized)} className={"changePass-form " + (this.props.isPatching ? "isPatching": "")}>
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Изменить пароль</span>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Текущий пароль *</span>
                            </label>
                            <input type="password" className="r-input__text"  autoComplete="current-password" required name="current_password" onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Новый пароль *</span>
                            </label>
                            <input type="password" className="r-input__text" autoComplete="new-password" required name="plainPassword[first]" onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="r-input__wrapper">
                            <label className="r-input__label">
                                <span>Повторите пароль *</span>
                            </label>
                            <input type="password" className="r-input__text" autoComplete="new-password" required name="plainPassword[second]" onChange={this.onChange} />
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
        isPatching: state.userChangePassRequest,
        errors: state.userChangePassErrors,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserPass: (form) => dispatch(updateUserPass(form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileChangePass);
