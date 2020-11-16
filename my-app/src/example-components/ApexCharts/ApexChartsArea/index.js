import React, { Fragment } from 'react';

import Chart from 'react-apexcharts';

export default function LivePreviewExample(props) {

  const options = {
    xaxis: {
      categories: props.x
    },
    yaxis: [
      {
        min: 0,
        max: props.maxy
      },
    ]
  };
  const series = [
    {
      name: 'Normal Distribution',
      data: props.y
    },
    {
      name: 'Test Result',
      data: props.data
    }
  ];

  return (
    <Fragment>
      <Chart options={options} series={series} type="area" />
    </Fragment>
  );
}
