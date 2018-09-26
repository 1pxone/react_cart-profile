import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addressDelete, getPickUpPoints, selectAddress } from '../../actions/addresses_new';
import Preloader from '../Preloader';
import MapRegions from './MapRegions';
import Ymap from './Ymap';
import regionsISO from './RussiaRegionsISO';
import Modal from '../Modal';

class MapPVZ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: ''
        };
    };

    componentDidMount(){
        var filtered = this.props.addresses.filter(a => ('externalId' in a));
        if (filtered.length){
            var sortedByActive = filtered.filter(a => (a['isActive'] === true));
            if(!sortedByActive.length){
                var targetAddress = Math.max.apply(Math, filtered.map(addr => addr.id))
                this.props.selectAddress(targetAddress)
            }
        };
        this.props.getPickUpPoints();
        this.getRegionByCode(this.props.geoIpData.region_code);
        window.createPVZAddress = this.createAddress;
    }

    toggleModal(){
        this.setState(prevState => ({
            ...this.state, isOpen: !prevState.isOpen, value: ''
        }));
    }

    getRegionByCode = (code) => {
        var regioncode = regionsISO.filter(a => a.code === code);
        if(regioncode.length && regioncode.length === 1){
            var value = regioncode[0].value;
            this.onChangeRegionStraight(value)
        }
    }

    onChangeRegion = (e) => {
        this.setState({ ...this.state, value: e.target.value })
    }

    onChangeRegionStraight = (value) => {
        this.setState({...this.state, value});
    }

    changePoint(){
        this.setState({...this.state, isOpen: true});
    }

    componentDidUpdate(prevProps, prevState){
        var addressesAll = this.props.addresses;
        var addressesExId = addressesAll.filter(a => ('externalId' in a));
        var addressesHasActive = addressesExId.filter(a => (a['isActive'] === true));

        if(this.state.isOpen && addressesHasActive.length && this.props.addSuccess && !prevProps.addSuccess){
            this.setState({...this.state, isOpen: false});
        }
    }

    render() {
        var addressesAll = this.props.addresses;
        var addressesExId = addressesAll.filter(a => ('externalId' in a));
        var addressesHasActive = addressesExId.filter(a => (a['isActive'] === true));

        return (
            <div className="row">
                <div className="col-12">
                    {addressesHasActive.length === 0  ?
                        (this.props.isLoading || this.props.geoIpIsLoading || this.props.isPatching ?
                            <Preloader />
                            :
                            <React.Fragment>
                                <div className="r-secction__heading map__heading">
                                    <span className="r-section__subtitle">Выберите пункт самовывоза на карте</span>
                                    <MapRegions onChangeRegion={this.onChangeRegion} onChangeRegionStraight={this.onChangeRegionStraight} getRegionByCode={this.getRegionByCode} value={this.state.value}/>
                                </div>
                                <div className={this.props.isAdding || this.props.isPatching ? "sdAddress--patching" : ""}>
                                    <Ymap points={this.props.points} region={this.state.value} />
                                </div>
                            </React.Fragment>
                        )
                        :
                        addressesHasActive.filter(a => ('externalId' in a)).map((a, i)=>(
                            <React.Fragment key={i}>
                                <div  className={"sdAddress__wrapper " + (this.props.isPatching ? "sdAddress--patching" : "")}>
                                    <div className="row">
                                        <div className="r-secction__heading col-12 col-lg-6">
                                            <span className="r-section__subtitle">Самовывоз по адресу:</span>
                                            <span onClick={()=>this.toggleModal()} className="r-btn-edit">Изменить</span>
                                            <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Выберите пункт самовывоза на карте" isMap={true}>
                                                <div className="r-secction__heading map__heading">
                                                    <span className="r-section__subtitle">Укажите регион:</span>
                                                    <MapRegions onChangeRegion={this.onChangeRegion} onChangeRegionStraight={this.onChangeRegionStraight} getRegionByCode={this.getRegionByCode} value={this.state.value}/>
                                                </div>
                                                <div className={this.props.isAdding || this.props.isPatching ? "sdAddress--patching" : ""}>
                                                    <Ymap points={this.props.points} region={this.state.value} center={a.coords}/>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                    <div className="sdAddress">
                                        <div className="sdAddress__data">
                                            <span>Пункт самовывоза компании "IML"</span>
                                            <span>{a.country}, {a.city}, {a.postcode},</span>
                                            <span>{a.address};</span>
                                            <span dangerouslySetInnerHTML={{__html: a.additionalInfo}} />
                                        </div>
                                        <div className="sdAddress__mapImage" style={{ backgroundImage: `url(https://static-maps.yandex.ru/1.x/?ll=${a.coords}&size=200,200&z=17&l=map&pt=${a.coords},org)` }} onClick={()=>this.toggleModal()}></div>
                                    </div>
                                </div>
                                {this.props.cartIsUpdating ?
                                    <Preloader />
                                    :
                                    (this.props.summary.delivery ? <React.Fragment><span className="fs-small">Стоимость доставки: </span><span className="sdAddress__heading--amount">{this.props.summary.delivery.cost > 0 ? (this.props.summary.delivery.cost + " ₽") : "Бесплатно"}</span></React.Fragment> : null)
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPatching: state.addressesIsUpdating,
        isAdding: state.addressesIsAdding,
        addSuccess: state.addressesAddSuccess,
        addresses: state.addresses,
        points: state.pickUpPoints,
        cartIsUpdating: state.cartIsUpdating,
        isLoading: state.pickUpPointsIsLoading,
        hasErrored: state.pickUpPointsHasErrored,
        summary: state.cartSummary,
        geoIpData: state.geoIpData,
        geoIpIsLoading: state.geoIpIsLoading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAddress: (id) => dispatch(addressDelete(id)),
        getPickUpPoints: () => dispatch(getPickUpPoints()),
        selectAddress: (id) => dispatch(selectAddress(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPVZ);
