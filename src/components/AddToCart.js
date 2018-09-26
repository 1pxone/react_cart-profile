import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cart_new';
import Modal from './Modal';

class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            adding: false,
            productdata: {}
        };
        this.modalShow = this.modalShow.bind(this);
        this.addToCartBtn = React.createRef();
    }

    componentDidMount(){
        if(this.props.sku){
            var productdata = window.productdata.filter(product => product.sku === this.props.sku);
            if(productdata.length && productdata[0]){
                this.setState({
                    productdata: productdata[0]
                })
            } else {
                console.warn(`No 'window.productdata' for  ${this.props.sku} initialized!`);
            }
        } else {
            console.warn("No 'data-sku' passed to this button's attributes");
        }
    }

    modalShow(){
        this.setState({isOpen: true, adding: true});
    }

    modalHide(){
        this.setState({isOpen: false, adding: false});
    }

    addToCart = (e) => {
        var nodeCurrentSku = this.addToCartBtn.current.parentNode.parentNode.dataset.sku;
        var currentProductData;
        if(nodeCurrentSku){
            var pd = window.productdata.filter(product => product.sku === nodeCurrentSku);
            if(pd.length && pd[0]){
                if(pd[0].image === ""){
                    pd[0].image = this.props.config.defaultProductImage;
                }
                this.setState({
                    productdata: pd[0]
                })
                currentProductData = pd[0];
            }
        }

        this.setState({adding: true});
        var cartqty;
        var qty = this.props.cart.filter(item => item.sku === nodeCurrentSku)
        if(qty[0]){
            cartqty = qty[0].count
        } else {
            cartqty = 0
        }
        var data = {
            qty: "",
            metadata: {
                title: "",
                image: "",
                link: ""
            }
        };
        var productdata = currentProductData;
        if(typeof productdata !== 'undefined' && Object.keys(productdata).length){
        	if(!productdata.qty){
            	console.warn("No 'window.productdata.qty' initialized!");
            } else if (!cartqty && productdata.qty){
            	data.qty = productdata.qty;
            } else if (cartqty && productdata.qty){
            	data.qty = cartqty + productdata.qty;
            } else {
            	console.warn("No 'window.productdata.qty' initialized!");
            };
            productdata.title ? data.metadata.title = productdata.title : console.warn("No 'window.productdata.title' initialized!");
            productdata.image ? data.metadata.image = productdata.image : data.metadata.image = this.props.config.defaultProductImage;
            productdata.link ? data.metadata.link = productdata.link : console.warn("No 'window.productdata.link' initialized!");
        } else {
        	console.warn("No 'window.productdata' initialized!");
        };
        data.qty ? this.props.addToCart(data, productdata.sku) : console.error("Nothing to add to cart, check warnings in console")
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.adding && nextProps.addSuccess){
            this.modalShow();
        }
    }

    render(){
        return (Object.keys(this.state.productdata).length ?
            <React.Fragment>
                <div className={"addToCart__wrapper " + (this.props.isPatching ? "isPatching" : "")}>
                    <button className={"r-btn-default " + (this.props.isPatching ? "isPatching" : "")} onClick={this.addToCart} ref={this.addToCartBtn}><span>{this.state.productdata.btntext ? this.state.productdata.btntext : "Добавить в корзину"}</span> <i className="addToCart__button__icon"></i></button>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={()=>this.modalHide()} heading={`Товар <span class="addToCart__productTitle">${this.state.productdata.title}</span> успешно добавлен в корзину!`}>
                    {this.state.productdata.image ? <div className="addToCart__image" style={{ backgroundImage: `url(${this.state.productdata.image})` }}></div> : null}
                    <div className="addToCart__modalControls">
                        <button onClick={()=>this.modalHide()} type="button" className="r-btn-edit fs-small">Продолжить покупки</button>
                        <a href="/cart" className="r-btn-default">Перейти в корзину</a>
                    </div>
                </Modal>
            </React.Fragment>
            :
            <div className="addToCart__wrapper">
                <button className="r-btn-default">Error!</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        isPatching: state.addingToCart,
        addSuccess: state.addToCartSuccess,
        addError: state.addToCartHasErrored,
        config: state.getConfigSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (data,sku) => dispatch(addToCart(data,sku))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
