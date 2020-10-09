import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, CardContent, Button, Divider } from '@material-ui/core';

import Chart from 'react-apexcharts';

const chart30Options = {
  chart: {
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#3c44b1'],
  stroke: {
    color: '#4191ff',
    curve: 'smooth',
    width: 4
  },
  xaxis: {
    crosshairs: {
      width: 1
    }
  },
  yaxis: {
    min: 0
  },
  legend: {
    show: false
  }
};

const chart30Data = [
  {
    name: 'Customers',
    data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
  }
];

const chart31Options = {
  chart: {
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#f4772e'],
  stroke: {
    color: '#4191ff',
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    crosshairs: {
      width: 1
    }
  },
  yaxis: {
    min: 0
  },
  legend: {
    show: false
  }
};

const chart31Data = [
  {
    name: 'Sales',
    data: [47, 38, 56, 24, 45, 54, 38, 47, 38, 56, 24, 56, 24, 65]
  }
];

export default class LivePreviewExample extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      failed: [],
      passed: []
    }
  }

  componentDidMount(){
    fetch('http://0.0.0.0:4000/get_failed_results')
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({failed: data});
    }).catch(console.log);

    fetch('http://0.0.0.0:4000/get_passed_results')
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({passed: data});
    }).catch(console.log);
  }

  render() {
    return (
      <Fragment>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="card-box bg-premium-dark border-0 text-light mb-4">
              <CardContent className="p-3">
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Passed Tests
                    </small>
                    <span className="font-size-xxl mt-1">{this.state.passed.length}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-success d-50 rounded-circle d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'thumbs-up']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="card-box bg-midnight-bloom text-light mb-4">
              <CardContent className="p-3">
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Failed Tests
                    </small>
                    <span className="font-size-xxl mt-1">{this.state.failed.length}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-danger d-50 rounded-circle d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'thumbs-down']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="card-box bg-plum-plate text-light mb-4">
              <CardContent className="p-3">
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Prone To Fail Tests
                    </small>
                    <span className="font-size-xxl mt-1">345</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-primary d-50 rounded-circle d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon
                        icon={['far', 'lightbulb']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Card className="card-box mb-4">
              <CardContent className="p-0">
                <Grid container spacing={4} className="mt-4">
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'user']}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'keyboard']}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">3,568</b>
                        <span className="text-black-50 d-block">clicks</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="divider mt-4" />
                <div className="text-center py-4">
                  <Button size="small" color="primary">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['far', 'eye']} />
                    </span>
                    <span className="btn-wrapper--label">Generate reports</span>
                  </Button>
                </div>
              </CardContent>
              <div className="card-footer bg-light text-center">
                <div className="pt-4 pr-4 pl-4">
                  <Chart
                    options={chart30Options}
                    series={chart30Data}
                    type="line"
                    height={100}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card className="card-box mb-4">
              <div className="card-body pb-1">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'user']}
                          className="font-size-xxl text-success"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">2,345</b>
                        <span className="text-black-50 d-block">users</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'keyboard']}
                          className="font-size-xxl text-danger"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">3,568</b>
                        <span className="text-black-50 d-block">clicks</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="text-center">
                      <div>
                        <FontAwesomeIcon
                          icon={['far', 'chart-bar']}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="pt-4 pr-4 pl-4">
                  <Chart
                    options={chart31Options}
                    series={chart31Data}
                    type="line"
                    height={100}
                  />
                </div>
              </div>
              <Divider />
              <div className="my-2 text-center">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-danger"
                />
                <span className="text-danger px-1">15.4%</span>
                <span className="text-black-50">new sales today</span>
              </div>
              <div className="card-footer bg-light p-4 text-center">
                <Button color="primary" variant="contained">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['far', 'eye']} />
                  </span>
                  <span className="btn-wrapper--label">View latest sales</span>
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
  
}
