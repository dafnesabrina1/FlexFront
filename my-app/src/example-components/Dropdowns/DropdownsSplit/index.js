import React, { Fragment } from 'react';

import { ButtonGroup, Menu, MenuItem, Button } from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function LivePreviewExample(props) {

  return (
    <Fragment>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="split button">
        <Button>{props.dropDown}</Button>
        <Button
          color="primary"
          size="small"
          aria-haspopup="true"
          onClick={props.handleClick}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="simple-menu2"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}>
        {
          props.arr.map(e => {
            return (<MenuItem id={e} onClick={props.onClick}>{e}</MenuItem>)
          })
        }
      </Menu>
    </Fragment>
  );
}
