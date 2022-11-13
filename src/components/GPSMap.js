import React from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import './Map.css';
import SetViewOnUpdate from './SetViewOnUpdate';

export default class GPSMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            center: [51.505, -0.09],
            marker: [51.505, -0.09, new Date()],
            linecolor : {
                color: 'red'
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.Clock !== this.props.Clock){
            const lat = this.props.Lat;
            const long = this.props.Long;
            const clock = this.props.Clock;
            const timeArr = clock.split(":");
            let curDate = new Date()
            curDate.setHours(timeArr[0]);
            curDate.setMinutes(timeArr[1]);
            curDate.setSeconds(timeArr[2]);
            let newCenter = [lat,long];
            let newMarker = [lat,long,curDate];
            this.setState({ center: newCenter, marker: newMarker });
        }
    }

    render(){
        return(
            <div className="map">
                <div className="labels">
                    <p>GPS</p>
                    <p className="display">LAT:{this.state.center[0]} | LONG:{this.state.center[1]}</p>
                </div>
                <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <CircleMarker center={this.state.center} pathOptions={{color:'red'}} radius={10}>
                        <Popup>
                            <span>{this.state.marker[0].toFixed(6)},{this.state.marker[1].toFixed(6)}. <br/> {this.state.marker[2].toString()}</span>
                        </Popup>
                    </CircleMarker>
                    <SetViewOnUpdate coords={this.state.center} />
                </MapContainer>
            </div>
        )
    }
}
