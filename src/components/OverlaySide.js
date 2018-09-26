import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';

class OverlaySide extends Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    };

    toggleModal(e){
        e.stopPropagation();
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && this.props.isOpen){
            this.props.onClose();
        }
    };

    componentDidUpdate(){
        if(this.props.isOpen){
            // document.addEventListener('mousedown', this.handleClickOutside);
            document.body.parentNode.classList.add("noScroll");
        } else {
            // document.removeEventListener('mousedown', this.handleClickOutside);
            document.body.parentNode.classList.remove("noScroll");
        }
    }


    render() {
        return (
            <CSSTransition in={this.props.isOpen} timeout={300} classNames="fade" unmountOnExit>
                <div className="r-overlay__drop" onClick={(e)=>this.toggleModal(e)}>
                    <CSSTransition in={this.props.isOpen} timeout={700} classNames={this.props.align === "left" ? "slideRight" : "slideLeft"} unmountOnExit={true}>
                        <div className={"r-overlay r-overlay--" + this.props.align} ref={this.setWrapperRef}>
                            {this.props.children}
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        );
    }
};

export default OverlaySide;
