import React, { Fragment } from 'react';

import DashboardDefaultSection1 from '../../example-components/DashboardDefault/DashboardDefaultSection1';
import DashboardDefaultSection2 from '../../example-components/DashboardDefault/DashboardDefaultSection2';
import DashboardDefaultSection3 from '../../example-components/DashboardDefault/DashboardDefaultSection3';
import DashboardDefaultSection4 from '../../example-components/DashboardDefault/DashboardDefaultSection4';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import XLSX from 'xlsx';
import { withLeaflet } from 'react-leaflet';

export default function DashboardDefault() {
  const [open3, setOpen3] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [file, setFile] = React.useState();

  const handleClickOpen3 = scrollType => () => {
    setOpen3(true);
    setScroll(scrollType);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleSubmit3 = () => {
    readExcel(file);
    setOpen3(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open3) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open3]);

  const readExcel= async(file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader= new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload= (e)=>{
        const bufferArray= e.target.result;
        const wb= XLSX.read(bufferArray, {type:'buffer'});
        const wsname= wb.SheetNames[0];
        const ws= wb.Sheets[wsname];
        const data= XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror= ((error)=>{
        reject(error);
      });
    });

    promise.then(async (d)=>{
      fetch('http://0.0.0.0:4000/add_excel',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          node_array: d
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      }).catch(console.log);
      
    })
  };

  return (
    <Fragment>
      <DashboardDefaultSection1 />
      <DashboardDefaultSection2 />
      <DashboardDefaultSection3 />
      <DashboardDefaultSection4 />
      <Button
      className="m-2 button-add"
      variant="contained"
      color="primary"
      onClick={handleClickOpen3('paper')}>
        Add
      </Button>
      <Dialog
      open={open3}
      onClose={handleClose3}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText>
            Please attatch the .xlsx file              
          </DialogContentText>
          <input type="file" id="input" onChange={(e)=>{
            const file = e.target.files[0];
            console.log(file);
            setFile(file);
          }} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit3} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
