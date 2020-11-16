import React, { Fragment } from 'react';

import { Paper } from '@material-ui/core';

function PageTitle(props) {

  return (
    <Fragment>
      <Paper square elevation={2} className="app-page-title">
        <div>
          <div className="app-page-title--first">
            <div className="app-page-title--heading">
              <h1>{props.titleHeading}</h1>
              <div className="app-page-title--description">
                {props.titleDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="speedial-wrapper">
            {props.component}
          </div>
        </div>
      </Paper>
    </Fragment>
  );
}

export default PageTitle;
