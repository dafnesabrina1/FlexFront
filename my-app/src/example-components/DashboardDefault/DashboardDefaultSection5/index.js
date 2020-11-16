import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import "./index.css";

export default function LivePreviewExample(props) {
   
      const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'sn', text: 'Serial Number', sort: true },
        { dataField: 's_no', text: 'S No', sort: true },
        { dataField: 'test_name', text: 'Test Name', sort: true },
        { dataField: 'test_field', text: 'Test Field', sort: true },
        { dataField: 'test_value', text: 'Test Value', sort: true },
        { dataField: 'test_result', text: 'Test Result', sort: true },
        { dataField: 'spec_name', text: 'Spec Name', sort: true },
        { dataField: 'limits_used', text: 'Limits Used', sort: false },
        { dataField: 'start_time', text: 'Start Time', sort: false },
        { dataField: 'stop_time', text: 'Stop Time', sort: false },
        { dataField: 'comments', text: 'Comments', sort: false }
      ];
      const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];
    
      const pagination = paginationFactory({
        page: 2,
        paginationSize: 3,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: false,
        alwaysShowAllBtns: true,
        hideSizePerPage: true,
        onPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        }
      });
    
      const { SearchBar, ClearSearchButton } = Search;
    
      const MyExportCSV = (props) => {
        const handleClick = () => {
          props.onExport();
        };
        return (
          <div>
            <button className="btn btn-success" onClick={handleClick}>Export to CSV</button>
          </div>
        );
      };
    
      return (
        <div >
    
          <ToolkitProvider
            bootstrap4
            keyField='id'
            data={props.products}
            columns={columns}
            search
            exportCSV
          >
            {
              props => (
                <div>
                  <h6>Input something at below input field:</h6>
                  <SearchBar  {...props.searchProps} />
                  <ClearSearchButton  {...props.searchProps} />
                  <hr />
                  <MyExportCSV {...props.csvProps} />
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    {...props.baseProps}
                  />
    
                </div>
              )
            }
          </ToolkitProvider>
    
        </div>
      );
    }
    