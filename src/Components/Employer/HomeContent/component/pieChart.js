import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    var setG = [
      this.props.redux_data.scheduleInterview === undefined
        ? 0
        : Object.keys(this.props.redux_data.scheduleInterview)?.length,
      this.props.redux_data.appointments === undefined
        ? 0
        : Object.keys(this.props.redux_data.appointments)?.length,
    ];
    this.state = {
      set: [
        this.props.redux_data.scheduleInterview === undefined
          ? 0
          : Object.keys(this.props.redux_data.scheduleInterview)?.length,
        this.props.redux_data.appointments === undefined
          ? 0
          : Object.keys(this.props.redux_data.appointments)?.length,
      ],

      options: {
        chart: {
          width: 380,
          type: "donut",
        },
        dataLabels: {
          enabled: true,

          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            return setG[seriesIndex];
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
        colors: ["#ffcb05", "#3E469D"],
        legend: {
          position: "right",
          offsetY: 0,
          height: 230,
        },
        labels: ["Schedule Interview", "Interviews"],
      },
    };
  }

  render() {
    // console.log(this.props.redux_data);
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
