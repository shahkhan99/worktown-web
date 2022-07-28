import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      set: [
        Object.keys(this.props.redux_data.scheduleInterview).length,
        this.props.appt.length,
      ],
      options: {
        chart: {
          width: 380,
          type: "donut",
        },
        dataLabels: {
          enabled: true,
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            console.log(w.config);
            return w.config.series[seriesIndex];
            // return (
            //   w.config.labels[seriesIndex] + ":  " + value.toFixed(0) + " %"
            // );
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 290,
                height: 165,
              },
              legend: {
                show: true,
                position: "top",
                // offsetY: 0,
                height: "auto",
              },
              dataLabels: {
                enabled: true,
                formatter: function (
                  value,
                  { seriesIndex, dataPointIndex, w }
                ) {
                  return w.config.series[seriesIndex];
                },
              },
            },
          },
        ],
        // fill: {},
        colors: ["#F09222", "#3E469D"],
        legend: {
          position: "right",
          offsetY: 0,
          height: 230,
        },
        labels: ["Schedule Interview", "Interviews"],
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps", nextProps);
    this.setState({
      set: [
        Object.keys(this.props.redux_data.scheduleInterview).length,
        this.props.appt.length,
      ],
    });
  }
  render() {
    // console.log(this.state.set);
    // console.log(this.props.appt.length);
    return (
      <div>
        <div class="chart-wrap">
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.set}
              type="donut"
              width={480}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexChart;
