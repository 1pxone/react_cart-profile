import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { genderFormat, phoneFormat } from '../../utils/';

class ProfileDash extends Component{
    render(){
        var u = this.props.user;
        return (
            <section className="dashBlock col-12 col-lg-6">
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Профиль</span>
                    <Link to="/account/settings" className="r-btn-edit">Редактировать</Link>
                </div>
                <span className="profileData__wrapper"><span className="profileData__key">ФИО:</span> <span className="profileData__value">{u.firstname} {u.surname}</span></span>
                <span className="profileData__wrapper"><span className="profileData__key">Телефон:</span> <span className="profileData__value">{phoneFormat(u.phone)}</span></span>
                <span className="profileData__wrapper"><span className="profileData__key">Email:</span> <span className="profileData__value">{u.email}</span></span>
                <span className="profileData__wrapper"><span className="profileData__key">Пол:</span> <span className="profileData__value">{genderFormat(u.gender)}</span></span>
                <span className="profileData__wrapper"><span className="profileData__key">Дата рождения:</span> <span className="profileData__value">{u.birthday === "" ? "Не указана" : u.birthday}</span></span>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        config: state.getConfigSuccess
    };
};

export default connect(mapStateToProps)(ProfileDash);
