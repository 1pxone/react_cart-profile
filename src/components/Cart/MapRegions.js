import React, {Component} from 'react';
import regionsISO from './RussiaRegionsISO';
import Autocomplete from 'react-autocomplete';

class MapRegions extends Component {
    render() {
        return (

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
                value={this.props.value}
                onChange={e => this.props.onChangeRegion(e)}
                onSelect={value => this.props.onChangeRegionStraight(value)}
                wrapperStyle={{width:'100%'}}
                renderMenu={(items, value, style)=>
                    <div style={{ ...style, ...this.menuStyle }} children={items} className="r-input__autocomplete"/>
                }
            />
        );
    }
};

export default MapRegions;
