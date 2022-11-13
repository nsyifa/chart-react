import React from 'react';
import Plot from 'react-plotly.js';

export default class PlotlyGraphThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line1: {
                x: [],
                y: [], 
                name: 'Yaw',
                mode: 'lines',
                color:'red',
            },
            line2: {
                x: [],
                y: [], 
                name: 'Pitch',
                mode: 'lines',
                color:'blue',
            },
            line3: {
                x: [],
                y: [], 
                name: 'Roll',
                mode: 'lines',
                color: 'green'
            },
            layout: { 
                datarevision: 0,
                autosize:false,
                width:660,
                height:250,
                paper_bgcolor:"white",
                plot_bgcolor:"white",
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 10,
                    pad: 4
                
                  },
            },
            revision: 0,
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.Clock !== this.props.Clock){
            const { line1,line2,line3, layout } = this.state;
            const yaw = this.props.Yaw;
            const pitch = this.props.Pitch;
            const roll = this.props.Roll;
            const clock = this.props.Clock;
            const timeArr = clock.split(":");
            let curDate = new Date()
            curDate.setHours(timeArr[0]);
            curDate.setMinutes(timeArr[1]);
            curDate.setSeconds(timeArr[2]);
            line1.x.push(curDate);
            line1.y.push(yaw);
            line2.y.push(pitch);
            line2.x.push(curDate);
            line3.y.push(roll);
            line3.x.push(curDate);
            let olderTime = curDate.setMinutes(curDate.getMinutes() - 1);
            let futureTime = curDate.setMinutes(curDate.getMinutes() + 1);
            layout.xaxis = {
                type: 'date',
                range: [olderTime,futureTime]
            };
            this.setState({ revision: this.state.revision + 1 });
            layout.datarevision = this.state.revision + 1;

        }
    }

    render() {  
        return (<div>
            <Plot 
                data={[
                    this.state.line1,
                    this.state.line2,
                    this.state.line3,
                ]}
                layout={this.state.layout}
                revision={this.state.revision}
                graphDiv="graph"
            />
        </div>);
    }
}