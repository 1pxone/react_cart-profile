import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addressAddRegion } from '../../actions/addresses_new';

class Ymap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            center: []
        };
        this.dataConvert = this.dataConvert.bind(this);
        this.getPointData = this.getPointData.bind(this);
        this.createAddress = this.createAddress.bind(this);
    };

    componentDidMount(){
        window.createPVZAddress = this.createAddress;
        window.ymaps.ready(() => {
            const myMap = new window.ymaps.Map('map-basics', {
                center: [55.751574, 37.573856],
                zoom: 10,
                behaviors: ['default', 'scrollZoom'],
                controls: ['zoomControl']
            })
            var objectManager = new window.ymaps.ObjectManager({
                clusterize: false
            });
            objectManager.add(this.dataConvert(this.props.points));
            objectManager.objects.options.set('preset', 'islands#greenDotIcon');
            objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
            myMap.geoObjects.add(objectManager);
            window.myMap = myMap;
            this.setState({...this.state, mounted: true})
        });

        if(this.props.region){
            window.ymaps.geocode(this.props.region, {
                results: 1
            }).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0),
                bounds = firstGeoObject.properties.get('boundedBy');
                window.myMap.setBounds(bounds, {
                    checkZoomRange: true
                });
            });
        }
        if(this.props.center){
            var coords = this.props.center;
            var arr = [];
            for(var i = 0; i<coords.split(",").length; i++){
                arr.push(parseFloat(coords.split(",")[i]))
            }
            var center = arr.reverse();
            this.setState({...this.state, center});
        }
    }

    dataConvert(data){
        var features = [];
        data.map((pvz, idx) => {
            var tmpObj = {
                "type": "Feature",
                "id": idx,
                "geometry": {
                    "type": "Point",
                    "coordinates": [pvz.Latitude, pvz.Longitude]
                },
                "properties": this.getPointData(pvz)
            };
            return features.push(tmpObj);
        })
        return features;
    };

    createAddress(data){
        var WorkMode = data.WorkMode ? `Часы работы: ${data.WorkMode};` : '';
        var Phone = data.Phone ? `Телефон: ${data.Phone};` : '';
        var PayByCard =  data.PaymentCard ? `Оплата картой: ${data.PaymentCard ? 'да' : 'нет'};` : '';
        var Code = data.Code ? `Код подразделения: ${data.Code};` : '';
        var PointCoords = `${data.Longitude},${data.Latitude}`;
        var normilized = {
            additionalInfo: Code + WorkMode + Phone + PayByCard,
            address: data.Address,
            city: data.RegionCode,
            region: data.RegionCode,
            country: "Россия",
            externalId: "iml_"+ data.Code,
            isActive: true,
            coords: PointCoords,
            postcode: data.Index,
            title: data.Code
        }
        this.props.addressAdd(normilized);
    }

    getPointData(pvz){
        var data = JSON.stringify(pvz);
        return {
            balloonContentBody:
                `<address class="sdAddress__point">
                    <strong> ${pvz.Address} </strong>
                    <br/>Телефон: ${pvz.Phone}
                    <br/>Часы работы: ${pvz.WorkMode}
                    <br/>Оплата картой: ${pvz.PaymentCard ? 'да' : 'нет'}
                    <br/><button onclick='window.createPVZAddress(${data})' class="r-btn-default w-full">Доставить сюда</button>
                </address>`,
            clusterCaption: `<strong>${pvz.Code}</strong>`,
            hintContent: `<strong>${pvz.RegionCode}, ${pvz.Address}</strong>`
        }
    };

    componentWillReceiveProps(nextProps){
        if(window.myMap){
            window.myMap.balloon.close();
            window.ymaps.geocode(nextProps.region, {
                results: 1
            }).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0),
                bounds = firstGeoObject.properties.get('boundedBy');
                window.myMap.setBounds(bounds, {
                    checkZoomRange: true
                });
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevState.mounted && this.state.mounted && this.state.center.length){
            window.myMap.setCenter(this.state.center,17)
        }
    }

    render() {
        return (
            <div id="map-basics"></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addressAdd: (data) => dispatch(addressAddRegion(data))
    }
};

export default connect(null, mapDispatchToProps)(Ymap);
