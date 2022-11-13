import React from 'react';
import Plot from 'react-plotly.js';

export default class PlotlyGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line1: {
                x: [],
                y: [], 
                name: 'Line 1',
                mode: 'lines',
                'line': {'shape': 'spline', 'smoothing': 1.3}
            },
            layout: { 
                datarevision: 0,
                autosize:false,
                width:430,
                height:240,
                plot_bgcolor:"white",
                paper_bgcolor:"white",
                margin: {
                    l: 40,
                    r: 20,
                    b: 50,
                    t: 0,
                    pad: 4
                
                  },
            },
            revision: 0,
            //datanumber: 1
        }
    };

     componentDidMount() {
         this.setState({ datanumber: this.props.dataNumber })
     }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.Clock !== this.props.Clock){
            const { line1, layout } = this.state;
            const data = this.props.newData;
            const clock = this.props.Clock;
            const timeArr = clock.split(":");
            let curDate = new Date()
            curDate.setHours(timeArr[0]);
            curDate.setMinutes(timeArr[1]);
            curDate.setSeconds(timeArr[2]);
            line1.x.push(curDate);
            line1.y.push(data);
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
                ]}
                layout={this.state.layout}
                revision={this.state.revision}
                graphDiv="graph"
            />
        </div>);
    }
}