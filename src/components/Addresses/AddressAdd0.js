import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addressAdd, addressPatch, addressDelete, geoIp } from '../../actions/addresses_new';
import Autocomplete from 'react-autocomplete';
import regionsISO from '../Cart/RussiaRegionsISO';

class AddressAdd extends Component {
    constructor(props) {
        super(props);
        if(this.props.curaddress){
            this.state = {
                form:{
                    isActive: this.props.curaddress.isActive,
                    country: this.props.curaddress.country,
                    city: this.props.curaddress.city,
                    region: this.props.curaddress.region,
                    address: this.props.curaddress.address,
                    postcode: this.props.curaddress.postcode,
                    additionalInfo: this.props.curaddress.additionalInfo
                },
                addressId: this.props.curaddress.id,
                value: this.getRegionByCode(this.props.curaddress.region),
                suggestIsOpen: false
            }
        } else if(this.props.summary && this.props.summary.address && !this.props.isAuth){
            this.state = {
                form:{
                    isActive: this.props.summary.address.isActive,
                    country: this.props.summary.address.country,
                    city: this.props.summary.address.city,
                    region: this.props.summary.address.region,
                    address:  this.props.summary.address.address,
                    postcode: this.props.summary.address.postcode,
                    additionalInfo: this.props.summary.address.additionalInfo
                },
                addressId: '',
                value: '',
                suggestIsOpen: false
            }
        } else if(this.props.geoIpData){
            this.state = {
                form:{
                    isActive: true,
                    country:  this.props.geoIpData.country_name ? this.props.geoIpData.country_name : "Россия",
                    city: this.props.geoIpData.city ? this.props.geoIpData.city : "",
                    region: this.props.geoIpData.region_code ? this.props.geoIpData.region_code : "",
                    address: "",
                    postcode: this.props.geoIpData.zip_code ? this.props.geoIpData.zip_code : "",
                    additionalInfo: ""
                },
                addressId: '',
                value: this.props.geoIpData.region_name ? this.props.geoIpData.region_name : "",
                suggestIsOpen: false
            }
        } else {
            this.state = {
                form:{
                    isActive: true,
                    country:  "Россия",
                    city: "",
                    region: "",
                    address: "",
                    postcode: "",
                    additionalInfo: ""
                },
                addressId: '',
                value: '',
                suggestIsOpen: false
            }
        }
        this.getRegionByCode = this.getRegionByCode.bind(this);
    };

    onChange = (e) => {
        const form = this.state.form;
        if(e.target.name === "isActive"){
            form[e.target.name] = !form.isActive
        } else {
            form[e.target.name] = e.target.value
        }
        this.setState({...this.state, form});
    };

    onChangeRegion(e, item){
        const form = this.state.form;
        form.region = e.target.value
        this.setState({ value: e.target.value })
    };

    onChangeRegionStraight(value){
        this.setState({...this.state, value});
    };

    checkOpen(isOpen){
        this.setState({...this.state, suggestIsOpen: isOpen})
    };

    save = (e) => {
        e.preventDefault();
        var form = this.state.form;
        if(this.props.curaddress){
            this.props.patchAddress(this.state.addressId, form);
        } else {
            this.props.addNewAddress(form);
        };
    };

    deleteAddress(e){
        e.preventDefault();
        this.props.deleteAddress(this.state.addressId)
    };

    getRegionByCode(code){
        var regioncode = regionsISO.filter(a => a.code === code);
        if(regioncode.length && regioncode.length === 1){
            return regioncode[0].value;
        } else {
            return '';
        }
    }

    componentDidMount(){
        var form = this.state.form;
        var that = this;

        if(window.ymaps){
            window.ymaps.ready(() => {
                var suggestView = new window.ymaps.SuggestView('addressText', {
                    results: 3,
                    provider: {
                        suggest:((request, options) => {
                            return window.ymaps.suggest(form.country + ", " + form.city + ", " +  request);
                        })}
                    }
                );
                suggestView.events.add('select', (e) => {
                    e.preventDefault();
    				var itemObject = e.get('item');
                    var formatedAddress = itemObject.value.split(",").slice(2).join(', ');
                    form.address = formatedAddress;
                    that.setState({...that.state, form});
                    document.getElementById("addressText").value = formatedAddress;
                })
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.value !== this.state.value){
            var regioncode = regionsISO.filter(a => a.value === this.state.value);
            var form = this.state.form;
            if(regioncode.length && regioncode.length === 1){
                form.region = regioncode[0].code;
                this.setState({...this.state, form});
            } else {
                form.region = '';
                this.setState({...this.state, form});
            }
        }
    }

    render(){
        return this.props.isAuth ?
            <form onSubmit={this.save} className={"address-form " + (this.props.isAdding || this.props.isPatching || this.props.geoIpIsLoading ? "isPatching": "")}>
                <div className="display-flex">
                    <div className="r-input__wrapper r-input__wrapper--half">
                        <label className="r-input__label">
                            <span>Страна *</span>
                        </label>
                        <select autoComplete='country-name'  className="r-input__select" required name="country" onChange={this.onChange} defaultValue={this.state.form.country}  >
                            <option value="Россия">Россия</option>
                            <option value="Беларусь">Беларусь</option>
                            <option value="Казахстан">Казахстан</option>
                        </select>
                    </div>
                    <div className="r-input__wrapper r-input__wrapper--half">
                        <label className="r-input__label">
                            <span>Почтовый индекс *</span>
                        </label>
                        <input autoComplete='postal-code' type="text" pattern="[0-9]{6}" className="r-input__text" required name="postcode" onChange={this.onChange} defaultValue={this.state.form.postcode}/>
                    </div>
                </div>
                {this.state.form.country === "Россия" ?
                    <div className="r-input__wrapper">
                        <label className="r-input__label">
                            <span>Область / Регион *</span>
                        </label>
                        <Autocomplete
                            getItemValue={(item) => item.value}
                            inputProps={{className: 'r-input__text'}}
                            items={regionsISO}
                            renderItem={(item, isHighlighted) =>
                                <div key={item.code} className={"r-input__autocomplete--option " + (isHighlighted ? 'r-input__autocomplete--option--selected' : '' )}>
                                    {item.value}
                                </div>
                            }
                            shouldItemRender={(item, value) => item.value.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            value={this.state.value}
                            onChange={(e,item) => this.onChangeRegion(e,item)}
                            onSelect={value => this.onChangeRegionStraight(value)}
                            onMenuVisibilityChange={isOpen => this.checkOpen(isOpen)}
                            wrapperStyle={{width:'100%'}}
                            renderMenu={(items, value, style)=>
                                <div style={{ ...style, ...this.menuStyle }} children={items} className="r-input__autocomplete"/>
                            }
                        />
                    </div>
                    :
                    null
                }

                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Город *</span>
                    </label>
                    <input autoComplete='on' type="text" className="r-input__text" required name="city" onChange={this.onChange} defaultValue={this.state.form.city}/>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Адрес *</span>
                    </label>
                    <input autoComplete='street-address' type="text" className="r-input__text" id="addressText" required name="address" onChange={this.onChange} defaultValue={this.state.form.address}/>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Дополнительная информация</span>
                    </label>
                    <textarea className="r-input__area" name="additionalInfo" onChange={this.onChange} defaultValue={this.state.form.additionalInfo}/>
                </div>
                <div className="r-input__wrapper inline">
                    <input type="checkbox" className="r-input__check" id="addressDefault" name="isActive" onChange={this.onChange} defaultChecked={this.props.curaddress && this.props.curaddress.isActive ?  'checked' : this.state.form.isActive}/>
                    <label className="r-input__label" htmlFor="addressDefault">
                        <span>Использовать этот адрес по умолчанию</span>
                    </label>
                </div>
                <div className="r-input__controls">
                    {this.state.addressId && this.props.on === "modal" ? <button type="button" className={"r-btn-edit fs-small " + (this.props.isAdding || this.props.isPatching ? "isPatching": "")} onClick={(e) => this.deleteAddress(e)}>Удалить</button> : null}
                    {this.props.on === "modal" && !this.state.addressId ? <button type="button" className={"r-btn-edit fs-small "} onClick={this.props.onClose}>Отмена</button> : null}
                    <button type="submit" className={"r-btn-default " + (this.props.isAdding || this.props.isPatching || (this.state.form.country === "Россия" && !this.state.form.region) ? "isPatching": "")}>Сохранить</button>
                </div>
            </form>
            :
            <form onSubmit={this.save} className={"address-form " + (this.props.isAdding || this.props.geoIpIsLoading ? "isPatching": "")}>
                <div className="display-flex">
                    <div className="r-input__wrapper r-input__wrapper--half">
                        <label className="r-input__label">
                            <span>Страна *</span>
                        </label>
                        <select autoComplete='country-name'  className="r-input__select" required name="country" onChange={this.onChange} defaultValue={this.state.form.country}  >
                            <option value="Россия">Россия</option>
                            <option value="Беларусь">Беларусь</option>
                            <option value="Казахстан">Казахстан</option>
                        </select>
                    </div>
                    <div className="r-input__wrapper r-input__wrapper--half">
                        <label className="r-input__label">
                            <span>Почтовый индекс *</span>
                        </label>
                        <input autoComplete='postal-code' type="text" className="r-input__text" required name="postcode" onChange={this.onChange} defaultValue={this.state.form.postcode}/>
                    </div>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Город *</span>
                    </label>
                    <input autoComplete='on' type="text" className="r-input__text" required name="city" onChange={this.onChange} defaultValue={this.state.form.city}/>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Адрес *</span>
                    </label>
                    <input autoComplete='street-address' type="text" className="r-input__text" required name="address" onChange={this.onChange} defaultValue={this.state.form.address}/>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Дополнительная информация</span>
                    </label>
                    <textarea className="r-input__area" name="additionalInfo" onChange={this.onChange} defaultValue={this.state.form.additionalInfo}/>
                </div>
                <div className="r-input__controls">
                    <button type="submit" className={"r-btn-default " + (this.props.isAdding ? "isPatching": "")}>Подтвердить</button>
                </div>
            </form>
    }
};

const mapStateToProps = (state) => {
    return {
        isAdding: state.addressesIsAdding,
        isAuth: state.userIsAuth,
        addError: state.addressesAddHasErrored,
        isPatching: state.addressesIsUpdating,
        addresses: state.addresses,
        summary: state.cartSummary,
        geoIpData: state.geoIpData,
        geoIpIsLoading: state.geoIpIsLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewAddress: (data) => dispatch(addressAdd(data)),
        // fetchDeliveryMethodsPassive: (params) => dispatch(fetchDeliveryMethodsPassive(params)),
        patchAddress : (id, data) => dispatch(addressPatch(id, data)),
        deleteAddress: (id) => dispatch(addressDelete(id)),
        geoIp: () => dispatch(geoIp())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressAdd);
