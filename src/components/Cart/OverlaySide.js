import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';

class OverlaySide extends Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    };

    handleClickOutside(e) {
        e.stopPropagation();
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && this.props.isOpen){
            this.props.onClose();
        }
    };

    componentDidUpdate(){
        if(this.props.isOpen){
            document.addEventListener('mousedown', this.handleClickOutside);
        } else {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }

    render(){
        return (
            <div className={"r-overlay__wrapper r-overlay__wrapper--" + (this.props.isOpen ? "show" : "hide")} ref={this.setWrapperRef}>
                <button className={"r-overlay__button r-overlay__button--" + (this.props.isOpen ? "show" : "hide")} type="button" onClick={this.props.onClose}>
                    {this.props.children[0]}
                </button>
                <CSSTransition in={this.props.isOpen} timeout={300} classNames={this.props.align === "left" ? "slideRight" : "slideLeft"} unmountOnExit={true}>
                    <div className={"r-overlay r-overlay--" + this.props.align} >
                        {this.props.children[1]}
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

export default OverlaySide;
