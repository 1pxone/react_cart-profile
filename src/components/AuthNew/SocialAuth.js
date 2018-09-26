import React, {Component} from 'react';
import { connect } from 'react-redux';

class SocialAuth extends Component {
    render(){
        var vk = 'https://static.graphitlab.io/libs/img//vk-svg-logo.svg';
        var facebook = 'https://static.graphitlab.io/libs/img//facebook-svg-logo.svg';
        var google = 'https://static.graphitlab.io/libs/img//google-svg-logo.svg';
        if(this.props.small){
            return (
                <div className="socialAuth__buttons--small">
                    <a href={"/ajax/v1/vk-register?successUrlPath=" + window.location.pathname} className="socialAuth__button socialAuth__button--vk">
                        <img src={vk} alt=""/>
                    </a>
                    <a href={"/ajax/v1/fb-register?successUrlPath=" + window.location.pathname} className="socialAuth__button socialAuth__button--fb">
                        <img src={facebook} alt=""/>
                    </a>
                    <a href={"/ajax/v1/gp-register?successUrlPath=" + window.location.pathname} className="socialAuth__button socialAuth__button--gp">
                        <img src={google} alt=""/>
                    </a>
                </div>
            );
        }
        return (
            <div className="socialAuth__buttons">
                <a href={"/ajax/v1/vk-register?successUrlPath=" + window.location.pathname} className="socialAuth__button socialAuth__button--vk">
                    <img src={vk} alt=""/>
                    <span className="socialAuth__text">Войти с помощью Вконтакте</span>
                </a>
                <a href={"/ajax/v1/fb-register?successUrlPath=" + window.location.pathname} className="socialAuth__button socialAuth__button--fb">
                    <img src={facebook} alt=""/>
                    <span className="socialAuth__text">Войти с помощью Facebook</span>
                </a>
                <a href={"/ajax/v1/gp-register?successUrlPath=" + window.location.pathname} className="socialAuth__button socialAuth__button--gp">
                    <img src={google} alt=""/>
                    <span className="socialAuth__text">Войти с помощью Google</span>
                </a>
            </div>
        );
    }
}

export default connect(null, null)(SocialAuth);
