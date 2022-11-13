import React from 'react';
import { MapContainer, TileLayer, useMap, Polyline, Marker, Popup, CircleMarker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import './Map.css';
import SetViewOnUpdate from './SetViewOnUpdate';

export default class GPSMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            polyline : [],
            center: [51.505, -0.09],
            markers: [],
            linecolor : {
                color: 'red'
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.Clock !== this.props.Clock){
            let newLine = [...this.state.polyline];
            let newMarkers = [...this.state.markers];
            const lat = this.props.Lat;
            const long = this.props.Long;
            const clock = this.props.Clock;
            const timeArr = clock.split(":");
            let curDate = new Date()
            curDate.setHours(timeArr[0]);
            curDate.setMinutes(timeArr[1]);
            curDate.setSeconds(timeArr[2]);
            let newCenter = [lat,long];
            newMarkers.push([lat,long,curDate])
            newLine.push([lat,long]);
            this.setState({ polyline: newLine, center: newCenter, markers: newMarkers });
        }
    }

    render(){
        const iconMarkup = renderToStaticMarkup(<i className="fa-regular fa-circle-dot" />);
        const customMarkerIcon = divIcon({
        html: iconMarkup,
        });
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
                    <Polyline pathOptions={this.state.linecolor} positions={this.state.polyline} />
                    <CircleMarker center={this.state.center} pathOptions={{color:'red'}} radius={10} />
                    {this.state.markers.map((data, idx) => 
                    <Marker key={`marker-${idx}`} position={[data[0],data[1]]} icon={customMarkerIcon}>
                        <Popup>
                            <span>{data[0].toFixed(3)},{data[1].toFixed(3)}. <br/> {data[2].toString()}</span>
                        </Popup>
                    </Marker>
                    )}
                    <SetViewOnUpdate coords={this.state.center} />
                </MapContainer>
            </div>
        )
    }
}
