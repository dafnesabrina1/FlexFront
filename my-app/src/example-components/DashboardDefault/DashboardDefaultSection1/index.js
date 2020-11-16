import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, CardContent } from '@material-ui/core';

const loadingPassed = (props) => {
  if (props.loadingPassed){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      <span className="font-size-xxl mt-1">{props.passed.length}</span>
    );
  }
};

const loadingFailed = (props) => {
  if (props.loadingFailed){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      <span className="font-size-xxl mt-1">{props.failed.length}</span>
    );
  }
};

export default function LivePreviewExample(props) {

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card className="card-box bg-premium-dark border-0 text-light mb-4">
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Passed Tests
                  </small>
                  {loadingPassed(props)}
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
        <Grid item xs={12} sm={6} >
          <Card className="card-box bg-midnight-bloom text-light mb-4">
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Failed Tests
                  </small>
                  {loadingFailed(props)}
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
      </Grid>
    </Fragment>
  );
}

