import React from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import PlotlyGraph from './components/PlotlyGraph';
import GPSMap from './components/GPSMap';
import PlotlyGraphThree from './components/PlotlyGraphThree';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
      stringData:'',
      randomData: [],
      data:{},
      changeData: true,
      socket: null,
      dataNumberYaw:2,
      dataNumberVolt:7,
      dataNumberPress:8,
      dataNumberAlt:9
    };
  }

  socketObserver = ({ socket }) => {
    useEffect(() => {
      if (socket) return;
      const socketio = io('https://backend-gmat-dummy.herokuapp.com/');
      console.log('connected');

      this.setState({ socket:socketio });
    },[socket])
    return null
  }

  socketGenerator = ({ socket }) => {
    useEffect(() => {
      if (!socket) return;

      socket.on('DATA', (payload) => {
        const dataArr = payload.slice(0, -1).split(',');

        const dataSensor = {
          TEAM_ID: dataArr[0],
          CLOCK: dataArr[1],
          YAW: Number(dataArr[2]),
          PITCH: Number(dataArr[3]),
          ROLL: Number(dataArr[4]),
          LATITUDE: Number(dataArr[5]),
          LONGITUDE: Number(dataArr[6]),
          VOLTAGE: Number(dataArr[7]),
          PRESSURE: Number(dataArr[8]),
          ALTITUDE: Number(dataArr[9]),
        };
        if(this.state.changeData){
          this.setState({ data:dataSensor });
        }
      });
    },[socket])
  }

  stopUpdate = () => {
    this.setState({ changeData: false })
  }

  startUpdate = () => {
    this.setState({ changeData: true })
  }

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(209, 209, 209)"
  }

  render(){
    return (
      <> 
      <this.socketObserver socket = {this.state.socket} />
      <this.socketGenerator socket = {this.state.socket} />
        <div className="identity">
          <div className="name">
            <p>Nama: Nasywa Syifa Azizah</p>
            <p>NIM: 21/474143/PA/20469</p>
          </div>
          <div className="buttons">
            <button onClick={this.stopUpdate}>Stop update</button>
            <button onClick={this.startUpdate}>Start update</button>
          </div>
        </div>
        <div className="graph-chart">
          <GPSMap Clock = {this.state.data?.CLOCK}
            Lat = {this.state.data?.LATITUDE}
            Long = {this.state.data?.LONGITUDE}
          /> 
          <div className="graph-three">
            <p>GYROSCOPE</p>
            <PlotlyGraphThree Clock = {this.state.data?.CLOCK} 
              Yaw = {this.state.data?.YAW} 
              Pitch = {this.state.data?.PITCH} 
              Roll = {this.state.data?.ROLL} 
            />
          </div>
        </div>  
        <div className="graph-container">
          <div className="graph">
            <p>VOLTAGE</p>
            <PlotlyGraph Clock = {this.state.data?.CLOCK} newData = {this.state.data?.VOLTAGE}/>
          </div>
          <div className="graph">
            <p>PRESSURE</p>
            <PlotlyGraph Clock = {this.state.data?.CLOCK} newData = {this.state.data?.PRESSURE}/>
          </div>
          <div className="graph">
            <p>ALTITUDE</p>
            <PlotlyGraph Clock = {this.state.data?.CLOCK} newData = {this.state.data?.ALTITUDE}/>
          </div>
        </div>   
      </>
    )
  }
}

 export default App;
