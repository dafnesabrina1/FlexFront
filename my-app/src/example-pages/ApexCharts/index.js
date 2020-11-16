import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';
import { Grid } from '@material-ui/core';

import { ExampleWrapperSimple } from '../../layout-components';

import ApexChartsLine from '../../example-components/ApexCharts/ApexChartsLine';
import ApexChartsArea from '../../example-components/ApexCharts/ApexChartsArea';
import ApexChartsColumn from '../../example-components/ApexCharts/ApexChartsColumn';
import ApexChartsBar from '../../example-components/ApexCharts/ApexChartsBar';
import ApexChartsMixed from '../../example-components/ApexCharts/ApexChartsMixed';
import ApexChartsHeatmap from '../../example-components/ApexCharts/ApexChartsHeatmap';
import ApexChartsRadialbar from '../../example-components/ApexCharts/ApexChartsRadialbar';
import ApexChartsRadar from '../../example-components/ApexCharts/ApexChartsRadar';

import DropdownsSplit from '../../example-components/Dropdowns/DropdownsSplit';
export default function ApexCharts() {

  const [x, setx] = React.useState([]);
  const [y, sety] = React.useState([]);
  const [sn, setSN] = React.useState([]);
  const [maxy, setMaxy] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dropDown, setDropDown] = React.useState("Select SN");
  const [stopLoading, setStopLoading] = React.useState(false);
  const [latestTests, setLatestTests] = React.useState([]);

  const makex = (min, max, step, data)=> {
    let arrx = [];
    for (let j=min; j<=max; j+=step) {
      arrx.push(j);
    }
    makey(arrx, std(arrx), mean(arrx), data)
  } 

  const makey = (xdata, sd, mean, ap) => {
    let val = [];
    let maxY = 0;
    for (let i=0; i<xdata.length; i++){
      let newy = (Math.pow(Math.E,-Math.pow(xdata[i]-mean,2)/(2*Math.pow(1, 2)))/(sd*Math.sqrt(2*Math.PI))).toFixed(2);
      if (parseFloat(newy) > maxY) {
        maxY= parseFloat(newy);
      }
      val.push(newy)
    }
    setMaxy((maxy) =>[...maxy, maxY])
    sety((y)=>[...y,val]);
    let arr= [];
    let dataArr = [];
    let count = -1;
    xdata.forEach((a) => {
      count++;
      let d = a.toFixed(1);
      arr.push(d);
      if (d === ap.toFixed(1)) {
        dataArr.push(val[count]);
      } else {
        dataArr.push(null);
      }
    });
    setData((data)=>[...data, dataArr]);
    setx((x)=>[...x, arr]);
  }

  const std = (arr, usePopulation = false) => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return Math.sqrt(
      arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
        (arr.length - (usePopulation ? 0 : 1))
    );
  };

  const mean = (arr) => {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
  }

  const onClick = event => {
    setStopLoading(false)
    sety([])
    setx([])
    setData([])
    setMaxy([])
    setDropDown(event.target.id);
    setAnchorEl(null);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sn: event.target.id })
    };
    fetch('http://0.0.0.0:4000/last_tests_of_sn', requestOptions)
    .then(res => res.json())
    .then((d) => {
      d.forEach((e)=>{
        let limits = e["limits_used"].split(" ")
        setLatestTests(latestTests =>[...latestTests,e["test_name"]])
        makex(parseFloat(limits[0]), parseFloat(limits[4]), .1, parseFloat(e["test_value"]));
      })
    }).then((e)=>{
      setStopLoading(true)
    })
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(()=>{
    fetch('http://0.0.0.0:4000/get_unique_sn')
    .then(res => res.json())
    .then((data) => {
      setSN(data);
    });
  }, []);

  const graphs = data.map((e,i)=>{

    return(<ExampleWrapperSimple sectionHeading={latestTests[i]}>
      <ApexChartsArea x={x[i]} y={y[i]} data={data[i]} maxy={maxy[i]} />
    </ExampleWrapperSimple>)
  })

  const loaded = (stopLoading) => {
    if (stopLoading) {
      return graphs;
    } else {
      return <div/>
    }
  }

  return (
    <Fragment>
      <PageTitle
        titleHeading="Individual Analisis"
        titleDescription="Here you will be able to check an individual analysis of a certain test"
        component={
            <Grid item xs={12} xl={4}>
                <DropdownsSplit 
                arr={sn} 
                onClick={onClick} 
                handleClick={handleClick}
                handleClose={handleClose}
                anchorEl={anchorEl}
                dropDown={dropDown}/>
            </Grid>
        }
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        {loaded(stopLoading)}
          <ExampleWrapperSimple sectionHeading="Column">
            <ApexChartsColumn />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple sectionHeading="Line">
            <ApexChartsLine />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple sectionHeading="Radar">
            <ApexChartsRadar />
          </ExampleWrapperSimple>
        </Grid>
        <Grid item xs={12} md={6}>
          <ExampleWrapperSimple sectionHeading="Bar">
            <ApexChartsBar />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple sectionHeading="Heatmap">
            <ApexChartsHeatmap />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple sectionHeading="Mixed">
            <ApexChartsMixed />
          </ExampleWrapperSimple>
          <ExampleWrapperSimple sectionHeading="Radial bar">
            <ApexChartsRadialbar />
          </ExampleWrapperSimple>
        </Grid>
      </Grid>
    </Fragment>
  );
}
